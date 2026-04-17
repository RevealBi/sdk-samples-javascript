import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IPivotConfiguration, IPivotDimension, IPivotValue } from 'igniteui-angular';
import { RVDashboardDataType } from 'reveal-sdk';
import {
    dataToJson,
    getRevealColumns,
    RevealIncomingData,
    RevealMetadataColumn
} from '../../utilities/data-utils';

declare global {
    interface Window {
        revealBridge: any;
        revealBridgeListener: any;
    }
}

type PivotFieldKind = 'boolean' | 'date' | 'number' | 'string';

interface PivotColumnDescriptor {
    name: string;
    kind: PivotFieldKind;
    displayMemberName: string;
    formatter?: (value: any) => string;
}

type PivotBindingSlot = 'rows' | 'columns' | 'values' | 'filters';

interface PivotFieldBindings {
    rows: string[];
    columns: string[];
    values: string[];
    filters: string[];
}

function detectColumnKind(column: RevealMetadataColumn, rows: any[]): PivotFieldKind {
    const revealType = RVDashboardDataType as any;

    if (column.type === revealType.Date || column.type === revealType.DateTime) {
        return 'date';
    }
    if (column.type === revealType.Number || column.type === revealType.Integer ||
        column.type === revealType.Decimal || column.type === revealType.Currency) {
        return 'number';
    }
    if (column.type === revealType.Bool || column.type === revealType.Boolean) {
        return 'boolean';
    }

    const typeName = String(column.type ?? '').toLowerCase();
    if (typeName.includes('date')) return 'date';
    if (typeName.includes('number') || typeName.includes('decimal') ||
        typeName.includes('int') || typeName.includes('currency')) return 'number';
    if (typeName.includes('bool')) return 'boolean';

    const sampleValue = rows
        .map(row => row[column.name])
        .find(value => value !== null && value !== undefined && value !== '');

    if (sampleValue instanceof Date) return 'date';
    if (typeof sampleValue === 'number') return 'number';
    if (typeof sampleValue === 'boolean') return 'boolean';

    if (typeof sampleValue === 'string') {
        const numericValue = Number(sampleValue);
        if (sampleValue.trim() !== '' && Number.isFinite(numericValue)) return 'number';
        const dateValue = new Date(sampleValue);
        if (!Number.isNaN(dateValue.getTime())) return 'date';
    }

    return 'string';
}

function normalizeValue(value: any, kind: PivotFieldKind): any {
    if (value === null || value === undefined || value === '') return null;

    if (kind === 'number') {
        const parsed = typeof value === 'number' ? value : Number(value);
        return Number.isFinite(parsed) ? parsed : value;
    }

    if (kind === 'date') {
        if (value instanceof Date) return value;
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? value : parsed;
    }

    return value;
}

function createDisplayMemberName(columnName: string): string {
    return `__formatted__${columnName}`;
}

function inferNumberFractionDigits(formattedText: string): number {
    const numericPortion = formattedText.match(/[\d.,]+/)?.[0];
    if (!numericPortion) return 0;

    const lastDot = numericPortion.lastIndexOf('.');
    const lastComma = numericPortion.lastIndexOf(',');
    const decimalIndex = Math.max(lastDot, lastComma);

    if (decimalIndex < 0) return 0;

    const digitsAfter = numericPortion.length - decimalIndex - 1;
    return digitsAfter >= 0 && digitsAfter <= 6 ? digitsAfter : 0;
}

function createNumericFormatter(sampleRawValue: number, sampleDisplayValue: string): ((value: any) => string) | undefined {
    const displayText = String(sampleDisplayValue ?? '').trim();
    if (displayText === '') return undefined;

    const hasPercentSuffix = displayText.includes('%');
    const numericPortion = displayText.match(/[\d.,]+/)?.[0];
    if (!numericPortion) return undefined;

    const useGrouping = /[\d][,.][\d]{3}(?:[^\d]|$)/.test(numericPortion);
    const fractionDigits = inferNumberFractionDigits(displayText);
    const prefix = displayText.slice(0, displayText.indexOf(numericPortion)).replace(/[-(]/g, '');
    const suffix = displayText.slice(displayText.indexOf(numericPortion) + numericPortion.length).replace(/[)]/g, '');
    const useParenthesesForNegative = displayText.includes('(') && displayText.includes(')');
    const useExplicitMinus = displayText.includes('-') && !useParenthesesForNegative;
    const isPercent = hasPercentSuffix && Math.abs(sampleRawValue) <= 1;

    return (value: any): string => {
        if (value === null || value === undefined || value === '') return '';

        const numericValue = typeof value === 'number' ? value : Number(value);
        if (!Number.isFinite(numericValue)) return String(value);

        const scaledValue = isPercent ? numericValue * 100 : numericValue;
        const absoluteValue = Math.abs(scaledValue);
        const formattedNumber = new Intl.NumberFormat(undefined, {
            useGrouping,
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits
        }).format(absoluteValue);

        const formattedValue = `${prefix}${formattedNumber}${suffix}`;
        if (numericValue < 0) {
            if (useParenthesesForNegative) return `(${formattedValue})`;
            if (useExplicitMinus) return `-${formattedValue}`;
        }

        return formattedValue;
    };
}

function resolveValueFormatter(columnName: string, rawRows: any[], displayRows: any[]): ((value: any) => string) | undefined {
    for (let index = 0; index < rawRows.length; index++) {
        const rawValue = rawRows[index]?.[columnName];
        const displayValue = displayRows[index]?.[columnName];
        const numericRawValue = typeof rawValue === 'number' ? rawValue : Number(rawValue);

        if (!Number.isFinite(numericRawValue) || displayValue === null || displayValue === undefined) continue;

        const formatter = createNumericFormatter(numericRawValue, String(displayValue));
        if (formatter) return formatter;
    }

    return undefined;
}

function normalizeSlotName(value: unknown): PivotBindingSlot | null {
    if (typeof value !== 'string') return null;
    const normalized = value.toLowerCase().replace(/[^a-z]/g, '');

    if (['row', 'rows', 'dimension', 'dimensions'].includes(normalized)) return 'rows';
    if (['column', 'columns', 'series'].includes(normalized)) return 'columns';
    if (['value', 'values', 'measure', 'measures', 'metric', 'metrics'].includes(normalized)) return 'values';
    if (['filter', 'filters'].includes(normalized)) return 'filters';
    return null;
}

function createEmptyBindings(): PivotFieldBindings {
    return { rows: [], columns: [], values: [], filters: [] };
}

function toPascalCase(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function getNamedValue(source: any, propertyNames: string[]): any {
    if (!source || typeof source !== 'object') return undefined;
    return propertyNames.map(p => source[p]).find(v => v !== undefined && v !== null);
}

function extractFieldName(candidate: any): string | null {
    if (typeof candidate === 'string') return candidate;
    if (!candidate || typeof candidate !== 'object') return null;

    const directName = getNamedValue(candidate, ['name', 'memberName', 'member', 'fieldName', 'columnName', 'key']);
    if (typeof directName === 'string' && directName.trim() !== '') return directName;

    for (const nested of [candidate.column, candidate.field, candidate.item, candidate.binding, candidate.descriptor]) {
        const nestedName = extractFieldName(nested);
        if (nestedName) return nestedName;
    }

    return null;
}

function resolveSlotFromCandidate(candidate: any): PivotBindingSlot | null {
    if (!candidate) return null;

    const directSlot = normalizeSlotName(
        typeof candidate === 'string'
            ? candidate
            : getNamedValue(candidate, [
                'slot', 'slotName', 'slotType', 'role', 'roleName',
                'bucket', 'bucketName', 'well', 'wellName', 'placement',
                'target', 'targetType', 'group', 'groupName', 'usage',
                'fieldRole', 'fieldUsage', 'section', 'area', 'zone', 'type'
            ])
    );
    if (directSlot) return directSlot;

    if (candidate.isRow === true) return 'rows';
    if (candidate.isColumn === true) return 'columns';
    if (candidate.isValue === true || candidate.isMeasure === true || candidate.isMetric === true) return 'values';
    if (candidate.isFilter === true) return 'filters';
    return null;
}

function resolveColumnSlot(column: RevealMetadataColumn): PivotBindingSlot | null {
    const candidates = [column, column['binding'], column['fieldBinding'], column['formatting'], column['format'], column['descriptor'], column['field'], column['source']];
    for (const slotCandidate of candidates) {
        const slot = resolveSlotFromCandidate(slotCandidate);
        if (slot) return slot;
    }
    return null;
}

function addBindingField(bindings: PivotFieldBindings, slot: PivotBindingSlot | null, fieldName: string | null): void {
    if (!slot || !fieldName || bindings[slot].includes(fieldName)) return;
    bindings[slot].push(fieldName);
}

function collectBindingsFromContainer(container: any, bindings: PivotFieldBindings): void {
    if (!container) return;

    if (Array.isArray(container)) {
        container.forEach(item => {
            addBindingField(bindings, resolveSlotFromCandidate(item), extractFieldName(item));
        });
        return;
    }

    if (typeof container !== 'object') return;

    (['rows', 'columns', 'values', 'filters'] as PivotBindingSlot[]).forEach(slot => {
        const slotItems = getNamedValue(container, [
            slot, toPascalCase(slot), `${slot}Fields`, `${toPascalCase(slot)}Fields`,
            slot.slice(0, -1), toPascalCase(slot.slice(0, -1))
        ]);
        if (slotItems === undefined || slotItems === null) return;
        const items = Array.isArray(slotItems) ? slotItems : [slotItems];
        items.forEach(item => addBindingField(bindings, slot, extractFieldName(item)));
    });
}

function extractPivotBindings(incomingData: RevealIncomingData, columns: PivotColumnDescriptor[]): PivotFieldBindings {
    const bindings = createEmptyBindings();
    const metadata: any = incomingData.metadata ?? {};

    [
        incomingData['binding'], incomingData['bindings'], incomingData['Binding'], incomingData['Bindings'],
        incomingData['formatting'], incomingData['Formatting'],
        incomingData['visualizationFields'], incomingData['VisualizationFields'],
        metadata.binding, metadata.bindings, metadata.Binding, metadata.Bindings,
        metadata.formatting, metadata.Formatting,
        metadata.visualizationFields, metadata.VisualizationFields,
        metadata.fields, metadata.Fields, metadata.slots, metadata.Slots
    ].forEach(container => collectBindingsFromContainer(container, bindings));

    (metadata.columns ?? []).forEach((column: any) => addBindingField(bindings, resolveColumnSlot(column), column.name));

    const knownColumns = new Set(columns.map(c => c.name));
    const sanitize = (fieldNames: string[]) => fieldNames.filter(f => knownColumns.has(f));

    return {
        rows: sanitize(bindings.rows),
        columns: sanitize(bindings.columns),
        values: sanitize(bindings.values),
        filters: sanitize(bindings.filters)
    };
}

@Component({
    selector: 'app-pivot-grid',
    templateUrl: './pivot-grid.component.html',
    styleUrls: ['./pivot-grid.component.scss']
})
export class PivotGridComponent implements OnInit {

    records: any[] = [];
    pivotConfiguration: IPivotConfiguration = {
        rows: [],
        columns: [],
        filters: [],
        values: []
    };

    constructor(private ref: ChangeDetectorRef) { }

    ngOnInit(): void {
        window.revealBridgeListener = {
            dataReady: (incomingData: RevealIncomingData) => {
                const dataset = this.buildPivotDataset(incomingData);
                const bindings = extractPivotBindings(incomingData, dataset.columns);

                this.pivotConfiguration = this.buildPivotConfiguration(dataset.columns, bindings);
                this.records = [...dataset.records];
                this.ref.detectChanges();
            }
        };

        window.revealBridge.notifyExtensionIsReady(true);
    }

    private buildPivotDataset(incomingData: RevealIncomingData): { columns: PivotColumnDescriptor[]; records: any[] } {
        const rawRows = dataToJson(incomingData);
        const displayRows = dataToJson(incomingData, { useFormattedValues: true });
        const columns: PivotColumnDescriptor[] = getRevealColumns(incomingData).map(column => ({
            name: column.name,
            kind: detectColumnKind(column, rawRows),
            displayMemberName: createDisplayMemberName(column.name),
            formatter: resolveValueFormatter(column.name, rawRows, displayRows)
        }));

        const records = rawRows.map((row, rowIndex) => {
            const normalizedRow: any = {};
            const displayRow = displayRows[rowIndex] ?? {};

            columns.forEach(column => {
                const rawValue = normalizeValue(row[column.name], column.kind);
                const displayValue = displayRow[column.name];
                normalizedRow[column.name] = rawValue;
                normalizedRow[column.displayMemberName] = displayValue ?? rawValue;
            });

            return normalizedRow;
        });

        return { columns, records };
    }

    private buildPivotConfiguration(columns: PivotColumnDescriptor[], bindings: PivotFieldBindings): IPivotConfiguration {
        const columnLookup = new Map(columns.map(c => [c.name, c]));
        const hasExplicitBindings = Object.values(bindings).some(slotFields => slotFields.length > 0);

        const resolveColumns = (fieldNames: string[], fallback: PivotColumnDescriptor[]) => {
            if (fieldNames.length === 0) return fallback;
            return fieldNames.map(f => columnLookup.get(f)).filter((c): c is PivotColumnDescriptor => c !== undefined);
        };

        const resolvedRows = resolveColumns(bindings.rows,
            hasExplicitBindings ? [] : columns.filter(c => c.kind !== 'number'));
        const resolvedColumns = resolveColumns(bindings.columns, []);
        const resolvedFilters = resolveColumns(bindings.filters, []);

        const fallbackValueColumns = hasExplicitBindings ? [] : columns.filter(c => c.kind === 'number');
        const resolvedValueColumns = resolveColumns(bindings.values, fallbackValueColumns);

        const fallbackValueColumn = !hasExplicitBindings && resolvedValueColumns.length === 0
            ? columns.find(c => c.kind !== 'date') ?? columns[0]
            : null;
        const finalValueColumns = resolvedValueColumns.length > 0
            ? resolvedValueColumns
            : fallbackValueColumn ? [fallbackValueColumn] : [];

        return {
            rows: resolvedRows.map(c => this.createPivotDimension(c)),
            columns: resolvedColumns.map(c => this.createPivotDimension(c)),
            filters: resolvedFilters.map(c => this.createPivotDimension(c)),
            values: finalValueColumns.map(c => this.createPivotValue(c))
        };
    }

    private createPivotDimension(column: PivotColumnDescriptor): IPivotDimension {
        return {
            enabled: true,
            memberName: column.name,
            memberFunction: (record: any) => record?.[column.displayMemberName] ?? record?.[column.name]
        };
    }

    private createPivotValue(column: PivotColumnDescriptor): IPivotValue {
        const isNumeric = column.kind === 'number';

        const sumAggregator = (members: any[]) => members.reduce((acc, val) => acc + (Number(val) || 0), 0);
        const avgAggregator = (members: any[]) => {
            const nums = members.filter(v => v != null && Number.isFinite(Number(v)));
            return nums.length ? nums.reduce((acc, val) => acc + Number(val), 0) / nums.length : 0;
        };
        const minAggregator = (members: any[]) => Math.min(...members.filter(v => v != null).map(Number));
        const maxAggregator = (members: any[]) => Math.max(...members.filter(v => v != null).map(Number));
        const countAggregator = (members: any[]) => members.length;

        const defaultAggregator = isNumeric
            ? { aggregator: sumAggregator, key: 'SUM', label: `Sum of ${column.name}` }
            : { aggregator: countAggregator, key: 'COUNT', label: `Count of ${column.name}` };

        return {
            member: column.name,
            displayName: isNumeric ? column.name : `${column.name} Count`,
            enabled: true,
            formatter: column.formatter,
            aggregate: defaultAggregator,
            aggregateList: [
                { aggregator: sumAggregator, key: 'SUM', label: `Sum of ${column.name}` },
                { aggregator: avgAggregator, key: 'AVG', label: `Average of ${column.name}` },
                { aggregator: minAggregator, key: 'MIN', label: `Minimum of ${column.name}` },
                { aggregator: maxAggregator, key: 'MAX', label: `Maximum of ${column.name}` },
                { aggregator: countAggregator, key: 'COUNT', label: `Count of ${column.name}` }
            ]
        };
    }
}
