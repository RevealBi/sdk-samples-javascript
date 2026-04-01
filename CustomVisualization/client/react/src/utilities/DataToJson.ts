export interface RevealMetadataColumn {
    name: string;
    type?: unknown;
    [key: string]: any;
}

export interface RevealIncomingData {
    metadata?: {
        columns?: RevealMetadataColumn[];
        [key: string]: any;
    };
    data?: any[][];
    [key: string]: any;
}

export function getRevealColumns(data: RevealIncomingData) {
    return data.metadata?.columns ?? [];
}

const rawValueKeys = [
    "value",
    "Value",
    "rawValue",
    "RawValue",
    "cellValue",
    "CellValue",
    "originalValue",
    "OriginalValue",
    "formattedValue",
    "FormattedValue",
    "displayValue",
    "DisplayValue"
];

const displayValueKeys = [
    "formattedValue",
    "FormattedValue",
    "displayValue",
    "DisplayValue",
    "text",
    "Text",
    "label",
    "Label",
    "value",
    "Value",
    "rawValue",
    "RawValue",
    "cellValue",
    "CellValue",
    "originalValue",
    "OriginalValue"
];

function extractCellValue(value: any, preferredKeys: string[]): any {
    if (value === null || value === undefined) {
        return value;
    }

    if (value instanceof Date || Array.isArray(value) || typeof value !== "object") {
        return value;
    }

    for (const key of preferredKeys) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            return extractCellValue(value[key], preferredKeys);
        }
    }

    const objectValues = Object.values(value);
    if (objectValues.length === 1) {
        return extractCellValue(objectValues[0], preferredKeys);
    }

    return value;
}

export function extractRevealRawValue(value: any) {
    return extractCellValue(value, rawValueKeys);
}

export function extractRevealDisplayValue(value: any) {
    const displayValue = extractCellValue(value, displayValueKeys);
    return displayValue === undefined ? extractRevealRawValue(value) : displayValue;
}

export function dataToJson(data: RevealIncomingData, options?: { useFormattedValues?: boolean }) {
    const propertyNames: string[] = [];
    const rows = data.data ?? [];
    const valueSelector = options?.useFormattedValues ? extractRevealDisplayValue : extractRevealRawValue;

    if (!data.metadata?.columns) {
        return [];
    }

    for (let c = 0; c < data.metadata.columns.length; c++) {
        const column = data.metadata.columns[c];
        propertyNames.push(column.name);
    }

    const dataObjects: any[] = [];
    for (let i = 0; i < rows.length; i++) {
        const rowData = rows[i];
        const dataObject: any = {};
        for (let j = 0; j < rowData.length; j++) {
            dataObject[propertyNames[j]] = valueSelector(rowData[j]);
        }
        dataObjects.push(dataObject);
    }

    return dataObjects;
}
