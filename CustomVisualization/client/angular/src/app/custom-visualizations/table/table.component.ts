import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { dataToJson, getRevealColumns } from '../../utilities/data-utils';

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
        const columns = getRevealColumns(incomingData);
        this.data = dataToJson(incomingData, { useFormattedValues: true });
        this.headers = columns.map(c => c.name);
        if (this.headers.length === 0 && this.data.length > 0) {
          this.headers = Object.keys(this.data[0]);
        }
        this.ref.detectChanges();
      }
    };
    window.revealBridge.notifyExtensionIsReady(true);
  }

}
