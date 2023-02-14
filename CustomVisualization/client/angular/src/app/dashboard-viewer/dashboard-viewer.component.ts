import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare let $: any;
$.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111/")

@Component({
  selector: 'app-dashboard-viewer',
  templateUrl: './dashboard-viewer.component.html',
  styleUrls: ['./dashboard-viewer.component.scss']
})
export class DashboardViewerComponent implements AfterViewInit {

  @ViewChild('revealView') el!: ElementRef;

  async ngAfterViewInit() {
    let dashboard = await $.ig.RVDashboard.loadDashboard("Sales");
    var revealView = new $.ig.RevealView(this.el.nativeElement);
    revealView.dashboard = dashboard;
  }

}
