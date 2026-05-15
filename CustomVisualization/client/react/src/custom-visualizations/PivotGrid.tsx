import { useEffect, useRef, useState } from "react";
import { IgrPivotGrid } from "igniteui-react-grids";
import { RVDashboardDataType } from "reveal-sdk";
import {
    dataToJson,
    getRevealColumns,
    RevealIncomingData,
    RevealMetadataColumn
} from "../utilities/DataToJson";
import "./PivotGrid.css";

type PivotFieldKind = "boolean" | "date" | "number" | "string";

interface PivotColumnDescriptor {
    name: string;
    kind: PivotFieldKind;
    displayMemberName: string;
    formatter?: (value: any) => string;
}

interface PivotDatasetState {
    columns: PivotColumnDescriptor[];
    records: any[];
}

type PivotBindingSlot = "rows" | "columns" | "values" | "filters";

interface PivotFieldBindings {
    rows: string[];
    columns: string[];
    values: string[];
    filters: string[];
}

function detectColumnKind(column: RevealMetadataColumn, rows: any[]): PivotFieldKind {
    const revealType = RVDashboardDataType as any;

    if (column.type === revealType.Date || column.type === revealType.DateTime) {
        return "date";
    }

    if (
        column.type === revealType.Number ||
        column.type === revealType.Integer ||
        column.type === revealType.Decimal ||
        column.type === revealType.Currency
    ) {
        return "number";
    }

    if (column.type === revealType.Bool || column.type === revealType.Boolean) {
        return "boolean";
    }

    const typeName = String(column.type ?? "").toLowerCase();
    if (typeName.includes("date")) {
        return "date";
    }
    if (typeName.includes("number") || typeName.includes("decimal") || typeName.includes("int") || typeName.includes("currency")) {
        return "number";
    }
    if (typeName.includes("bool")) {
        return "boolean";
    }

    const sampleValue = rows
        .map((row) => row[column.name])
        .find((value) => value !== null && value !== undefined && value !== "");

    if (sampleValue instanceof Date) {
        return "date";
    }
    if (typeof sampleValue === "number") {
        return "number";
    }
    if (typeof sampleValue === "boolean") {
        return "boolean";
    }

    if (typeof sampleValue === "string") {
        const numericValue = Number(sampleValue);
        if (sampleValue.trim() !== "" && Number.isFinite(numericValue)) {
            return "number";
        }

        const dateValue = new Date(sampleValue);
        if (!Number.isNaN(dateValue.getTime())) {
            return "date";
        }
    }

    return "string";
}

function normalizeValue(value: any, kind: PivotFieldKind) {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    if (kind === "number") {
        const parsedNumber = typeof value === "number" ? value : Number(value);
        return Number.isFinite(parsedNumber) ? parsedNumber : value;
    }

    if (kind === "date") {
        if (value instanceof Date) {
            return value;
        }

        const parsedDate = new Date(value);
        return Number.isNaN(parsedDate.getTime()) ? value : parsedDate;
    }

    return value;
}

function createDisplayMemberName(columnName: string) {
    return `__formatted__${columnName}`;
}

function inferNumberFractionDigits(formattedText: string) {
    const numericPortion = formattedText.match(/[\d.,]+/)?.[0];
    if (!numericPortion) {
        return 0;
    }

    const lastDot = numericPortion.lastIndexOf(".");
    const lastComma = numericPortion.lastIndexOf(",");
    const decimalIndex = Math.max(lastDot, lastComma);

    if (decimalIndex < 0) {
        return 0;
    }

    const digitsAfterSeparator = numericPortion.length - decimalIndex - 1;
    return digitsAfterSeparator >= 0 && digitsAfterSeparator <= 6 ? digitsAfterSeparator : 0;
}

function createNumericFormatter(sampleRawValue: number, sampleDisplayValue: string) {
    const displayText = String(sampleDisplayValue ?? "").trim();
    if (displayText === "") {
        return undefined;
    }

    const hasPercentSuffix = displayText.includes("%");
    const numericPortion = displayText.match(/[\d.,]+/)?.[0];

    if (!numericPortion) {
        return undefined;
    }

    const useGrouping = /[\d][,.][\d]{3}(?:[^\d]|$)/.test(numericPortion);
    const fractionDigits = inferNumberFractionDigits(displayText);
    const prefix = displayText.slice(0, displayText.indexOf(numericPortion)).replace(/[-(]/g, "");
    const suffix = displayText
        .slice(displayText.indexOf(numericPortion) + numericPortion.length)
        .replace(/[)]/g, "");
    const useParenthesesForNegative = displayText.includes("(") && displayText.includes(")");
    const useExplicitMinus = displayText.includes("-") && !useParenthesesForNegative;
    const isPercent = hasPercentSuffix && Math.abs(sampleRawValue) <= 1;

    return (value: any) => {
        if (value === null || value === undefined || value === "") {
            return "";
        }

        const numericValue = typeof value === "number" ? value : Number(value);
        if (!Number.isFinite(numericValue)) {
            return String(value);
        }

        const scaledValue = isPercent ? numericValue * 100 : numericValue;
        const absoluteValue = Math.abs(scaledValue);
        const formattedNumber = new Intl.NumberFormat(undefined, {
            useGrouping,
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits
        }).format(absoluteValue);

        const formattedValue = `${prefix}${formattedNumber}${suffix}`;
        if (numericValue < 0) {
            if (useParenthesesForNegative) {
                return `(${formattedValue})`;
            }

            if (useExplicitMinus) {
                return `-${formattedValue}`;
            }
        }

        return formattedValue;
    };
}

function resolveValueFormatter(columnName: string, rawRows: any[], displayRows: any[]) {
    for (let index = 0; index < rawRows.length; index++) {
        const rawValue = rawRows[index]?.[columnName];
        const displayValue = displayRows[index]?.[columnName];
        const numericRawValue = typeof rawValue === "number" ? rawValue : Number(rawValue);

        if (!Number.isFinite(numericRawValue) || displayValue === null || displayValue === undefined) {
            continue;
        }

        const formatter = createNumericFormatter(numericRawValue, String(displayValue));
        if (formatter) {
            return formatter;
        }
    }

    return undefined;
}

function buildPivotDataset(incomingData: RevealIncomingData): PivotDatasetState {
    const rawRows = dataToJson(incomingData);
    const displayRows = dataToJson(incomingData, { useFormattedValues: true });
    const columns = getRevealColumns(incomingData).map((column) => ({
        name: column.name,
        kind: detectColumnKind(column, rawRows),
        displayMemberName: createDisplayMemberName(column.name),
        formatter: resolveValueFormatter(column.name, rawRows, displayRows)
    }));

    const records = rawRows.map((row, rowIndex) => {
        const normalizedRow: any = {};
        const displayRow = displayRows[rowIndex] ?? {};

        columns.forEach((column) => {
            const rawValue = normalizeValue(row[column.name], column.kind);
            const displayValue = displayRow[column.name];

            normalizedRow[column.name] = rawValue;
            normalizedRow[column.displayMemberName] = displayValue ?? rawValue;
        });

        return normalizedRow;
    });

    return { columns, records };
}

function normalizeSlotName(value: unknown): PivotBindingSlot | null {
    if (typeof value !== "string") {
        return null;
    }

    const normalizedValue = value.toLowerCase().replace(/[^a-z]/g, "");

    if (["row", "rows", "dimension", "dimensions"].includes(normalizedValue)) {
        return "rows";
    }

    if (["column", "columns", "series"].includes(normalizedValue)) {
        return "columns";
    }

    if (["value", "values", "measure", "measures", "metric", "metrics"].includes(normalizedValue)) {
        return "values";
    }

    if (["filter", "filters"].includes(normalizedValue)) {
        return "filters";
    }

    return null;
}

function createEmptyBindings(): PivotFieldBindings {
    return {
        rows: [],
        columns: [],
        values: [],
        filters: []
    };
}

function toPascalCase(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function getNamedValue(source: any, propertyNames: string[]) {
    if (!source || typeof source !== "object") {
        return undefined;
    }

    return propertyNames
        .map((propertyName) => source[propertyName])
        .find((value) => value !== undefined && value !== null);
}

function extractFieldName(candidate: any): string | null {
    if (typeof candidate === "string") {
        return candidate;
    }

    if (!candidate || typeof candidate !== "object") {
        return null;
    }

    const directName = getNamedValue(candidate, [
        "name",
        "memberName",
        "member",
        "fieldName",
        "columnName",
        "key"
    ]);

    if (typeof directName === "string" && directName.trim() !== "") {
        return directName;
    }

    const nestedCandidates = [
        candidate.column,
        candidate.field,
        candidate.item,
        candidate.binding,
        candidate.descriptor
    ];

    for (const nestedCandidate of nestedCandidates) {
        const nestedName = extractFieldName(nestedCandidate);
        if (nestedName) {
            return nestedName;
        }
    }

    return null;
}

function resolveSlotFromCandidate(candidate: any): PivotBindingSlot | null {
    if (!candidate) {
        return null;
    }

    const directSlot = normalizeSlotName(
        typeof candidate === "string"
            ? candidate
            : getNamedValue(candidate, [
                "slot",
                "slotName",
                "slotType",
                "role",
                "roleName",
                "bucket",
                "bucketName",
                "well",
                "wellName",
                "placement",
                "target",
                "targetType",
                "group",
                "groupName",
                "usage",
                "fieldRole",
                "fieldUsage",
                "section",
                "area",
                "zone",
                "type"
            ])
    );

    if (directSlot) {
        return directSlot;
    }

    if (candidate.isRow === true) {
        return "rows";
    }

    if (candidate.isColumn === true) {
        return "columns";
    }

    if (candidate.isValue === true || candidate.isMeasure === true || candidate.isMetric === true) {
        return "values";
    }

    if (candidate.isFilter === true) {
        return "filters";
    }

    return null;
}

function resolveColumnSlot(column: RevealMetadataColumn): PivotBindingSlot | null {
    const slotCandidates = [
        column,
        column.binding,
        column.fieldBinding,
        column.formatting,
        column.format,
        column.descriptor,
        column.field,
        column.source
    ];

    for (const slotCandidate of slotCandidates) {
        const slot = resolveSlotFromCandidate(slotCandidate);
        if (slot) {
            return slot;
        }
    }

    return null;
}

function addBindingField(bindings: PivotFieldBindings, slot: PivotBindingSlot | null, fieldName: string | null) {
    if (!slot || !fieldName || bindings[slot].includes(fieldName)) {
        return;
    }

    bindings[slot].push(fieldName);
}

function collectBindingsFromContainer(container: any, bindings: PivotFieldBindings) {
    if (!container) {
        return;
    }

    if (Array.isArray(container)) {
        container.forEach((item) => {
            const slot = resolveSlotFromCandidate(item);
            const fieldName = extractFieldName(item);
            addBindingField(bindings, slot, fieldName);
        });
        return;
    }

    if (typeof container !== "object") {
        return;
    }

    (["rows", "columns", "values", "filters"] as PivotBindingSlot[]).forEach((slot) => {
        const slotItems = getNamedValue(container, [
            slot,
            toPascalCase(slot),
            `${slot}Fields`,
            `${toPascalCase(slot)}Fields`,
            slot.slice(0, -1),
            toPascalCase(slot.slice(0, -1))
        ]);

        if (slotItems === undefined || slotItems === null) {
            return;
        }

        const items = Array.isArray(slotItems) ? slotItems : [slotItems];
        items.forEach((item) => addBindingField(bindings, slot, extractFieldName(item)));
    });
}

function extractPivotBindings(incomingData: RevealIncomingData, columns: PivotColumnDescriptor[]) {
    const bindings = createEmptyBindings();
    const metadata = incomingData.metadata ?? {};

    [
        incomingData.binding,
        incomingData.bindings,
        incomingData.Binding,
        incomingData.Bindings,
        incomingData.formatting,
        incomingData.Formatting,
        incomingData.visualizationFields,
        incomingData.VisualizationFields,
        metadata.binding,
        metadata.bindings,
        metadata.Binding,
        metadata.Bindings,
        metadata.formatting,
        metadata.Formatting,
        metadata.visualizationFields,
        metadata.VisualizationFields,
        metadata.fields,
        metadata.Fields,
        metadata.slots,
        metadata.Slots
    ].forEach((container) => collectBindingsFromContainer(container, bindings));

    (metadata.columns ?? []).forEach((column) => addBindingField(bindings, resolveColumnSlot(column), column.name));

    const knownColumns = new Set(columns.map((column) => column.name));
    const sanitizeFields = (fieldNames: string[]) => fieldNames.filter((fieldName) => knownColumns.has(fieldName));

    return {
        rows: sanitizeFields(bindings.rows),
        columns: sanitizeFields(bindings.columns),
        values: sanitizeFields(bindings.values),
        filters: sanitizeFields(bindings.filters)
    };
}

function createPivotDimension(column: PivotColumnDescriptor) {
    return {
        enabled: true,
        memberName: column.name,
        memberFunction: (record: any) => record?.[column.displayMemberName] ?? record?.[column.name]
    };
}

function createPivotValue(column: PivotColumnDescriptor) {
    const defaultAggregator = column.kind === "number"
        ? {
            aggregatorName: "SUM",
            key: "SUM",
            label: `Sum of ${column.name}`
        }
        : {
            aggregatorName: "COUNT",
            key: "COUNT",
            label: `Count of ${column.name}`
        };

    return {
        member: column.name,
        displayName: column.kind === "number" ? column.name : `${column.name} Count`,
        enabled: true,
        formatter: column.formatter,
        aggregate: defaultAggregator,
        aggregateList: [
            {
                aggregatorName: "SUM",
                key: "SUM",
                label: `Sum of ${column.name}`
            },
            {
                aggregatorName: "AVG",
                key: "AVG",
                label: `Average of ${column.name}`
            },
            {
                aggregatorName: "MIN",
                key: "MIN",
                label: `Minimum of ${column.name}`
            },
            {
                aggregatorName: "MAX",
                key: "MAX",
                label: `Maximum of ${column.name}`
            },
            {
                aggregatorName: "COUNT",
                key: "COUNT",
                label: `Count of ${column.name}`
            }
        ]
    };
}

function buildPivotConfiguration(columns: PivotColumnDescriptor[], bindings: PivotFieldBindings) {
    const columnLookup = new Map(columns.map((column) => [column.name, column]));
    const hasExplicitBindings = Object.values(bindings).some((slotFields) => slotFields.length > 0);

    const resolveColumns = (fieldNames: string[], fallback: PivotColumnDescriptor[]) => {
        if (fieldNames.length === 0) {
            return fallback;
        }

        return fieldNames
            .map((fieldName) => columnLookup.get(fieldName))
            .filter((column): column is PivotColumnDescriptor => column !== undefined);
    };

    const resolvedRows = resolveColumns(
        bindings.rows,
        hasExplicitBindings ? [] : columns.filter((column) => column.kind !== "number")
    );

    const resolvedColumns = resolveColumns(
        bindings.columns,
        hasExplicitBindings ? [] : []
    );

    const resolvedFilters = resolveColumns(
        bindings.filters,
        hasExplicitBindings ? [] : []
    );

    const fallbackValueColumns = hasExplicitBindings
        ? []
        : columns.filter((column) => column.kind === "number");
    const resolvedValueColumns = resolveColumns(bindings.values, fallbackValueColumns);

    const fallbackValueColumn = !hasExplicitBindings && resolvedValueColumns.length === 0
        ? columns.find((column) => column.kind !== "date") ?? columns[0]
        : null;
    const finalValueColumns = resolvedValueColumns.length > 0
        ? resolvedValueColumns
        : fallbackValueColumn
            ? [fallbackValueColumn]
            : [];

    return {
        rows: resolvedRows.map(createPivotDimension),
        columns: resolvedColumns.map(createPivotDimension),
        filters: resolvedFilters.map(createPivotDimension),
        values: finalValueColumns.map(createPivotValue)
    };
}

export default function PivotGridVisualization() {
    const pivotGridRef = useRef<any>(null);
    const [pivotDataset, setPivotDataset] = useState<PivotDatasetState>({
        columns: [],
        records: []
    });
    const [pivotConfiguration, setPivotConfiguration] = useState<any>({
        rows: [],
        columns: [],
        filters: [],
        values: []
    });

    useEffect(() => {
        window.revealBridgeListener = {
            dataReady: (incomingData: RevealIncomingData) => {
                const nextDataset = buildPivotDataset(incomingData);
                const nextBindings = extractPivotBindings(incomingData, nextDataset.columns);
                setPivotDataset(nextDataset);
                setPivotConfiguration(buildPivotConfiguration(nextDataset.columns, nextBindings));
            }
        };

        window.revealBridge.notifyExtensionIsReady(true);
    }, []);

    return (
        <div className="pivot-visualization">
            <IgrPivotGrid
                ref={pivotGridRef}
                className="pivot-visualization__grid"
                data={pivotDataset.records}
                pivotConfiguration={pivotConfiguration}
                pivotUI={{ showConfiguration: false }}
                defaultExpandState={false}
                superCompactMode={true}
            />
        </div>
    );
}
