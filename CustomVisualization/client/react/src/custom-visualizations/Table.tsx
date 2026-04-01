import { useEffect, useState } from "react";
import { dataToJson, getRevealColumns, RevealMetadataColumn } from "../utilities/DataToJson";

export default function TableVisualization() {
    const [columns, setColumns] = useState<RevealMetadataColumn[]>([]);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        window.revealBridgeListener = {
            dataReady: (incomingData: any) => {
                setColumns(getRevealColumns(incomingData));
                setData(dataToJson(incomingData, { useFormattedValues: true }));
            }
        };
        window.revealBridge.notifyExtensionIsReady(true);
    }, []);

    const renderTableHeader = () => {
        if (columns.length > 0) {
            return columns.map((column) => <th key={column.name}>{column.name}</th>);
        }

        return <th>No Data</th>;
    }

    const renderTableBody = () => {
        if (data.length > 0) {
            return data.map((item: any, index: number) => (
                <tr key={index}>{renderTableData(item)}</tr>
            ));
        }

        return (<tr><td>No Data</td></tr>);
    }

    const renderTableData = (row: any) => {
        const cells = columns.length > 0 ? columns.map((column) => column.name) : Object.keys(row);
        return cells.map((propertyName) => (
            <td key={propertyName}>{row[propertyName]}</td>
        ));
    }

    return (
        <div className="container">
            <table>
                <thead>
                    <tr>{renderTableHeader()}</tr>
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </table>
        </div>
    );
}
