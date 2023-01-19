export function dataToJson(data: any) {
    let propertyNames = [];

    if (!data.metadata.columns) {
        return [];
    }

    for (var c = 0; c < data.metadata.columns.length; c++) {
        var column = data.metadata.columns[c];
        propertyNames.push(column.name);
    }

    let dataObjects = [];
    for (var i = 0; i < data.data.length; i++) {
        var rowData = data.data[i];
        let dataObject: any = {};
        for (var j = 0; j < rowData.length; j++) {
            dataObject[propertyNames[j]] = rowData[j];
        }
        dataObjects.push(dataObject);
    }

    return dataObjects;
}