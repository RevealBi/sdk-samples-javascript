import { useEffect, useState } from "react";
import { dataToJson } from "../utilities/DataToJson";

export default function TableVisualization() {

    const [data, setData] = useState<any>([])

    useEffect(() => {
        window.revealBridgeListener = {
            dataReady: (incomingData: any) => {
                setData(dataToJson(incomingData));
            }
        };
        window.revealBridge.notifyExtensionIsReady();
    }, []);

    const renderTableHeader = () => {
        if (data !== null && data.length > 0) {
            const tableHeadings: any = [];
            Object.keys(data[0]).map((propertyName: string, index: number) => {
                tableHeadings.push(<th key={index}>{propertyName}</th>)
            })
            return tableHeadings;
        }
        else {
            return <th>No Data</th>
        }
    }

    const renderTableBody = () => {
        if (data !== null && data.length > 0) {
            const trItems: any = [];
            data.map((item: any, index: any) => {
                trItems.push(<tr key={index}>{renderTableData(item)}</tr>);
            });
            return trItems;
        }
        else {
            return (<tr><td>No Data</td></tr>);
        }
    }

    const renderTableData = (row: any) => {
        let tdItems = [];
        for (let prop in row) {
            tdItems.push(<td key={prop}>{row[prop]}</td>)
        }
        return tdItems;
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
    )
}