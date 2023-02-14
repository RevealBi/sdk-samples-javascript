import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    revealBridge: any;
    revealBridgeListener: any;
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  data: any = [];
  headers: any = [];

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    window.revealBridgeListener = {
      dataReady: (incomingData: any) => {
        this.data = this.dataToJson(incomingData);
        this.createTableHeaders(this.data);
        this.ref.detectChanges();
      }
    };
    window.revealBridge.notifyExtensionIsReady();
  }

  createTableHeaders(data: any) {
    if (data.length === 0) {
      return;
    }

    Object.keys(this.data[0]).map((propertyName: string) => {
      this.headers.push(propertyName)
    })
  }

  dataToJson(data: any) {
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

}
