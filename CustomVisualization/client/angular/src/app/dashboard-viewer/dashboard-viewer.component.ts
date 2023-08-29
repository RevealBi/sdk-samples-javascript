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

    //add custom vizualization to chart types drop down
    revealView.chartTypes.push({
      title: "HTML Table",
      url: "http://localhost:4200/table", //provide the url to your custom vizualization
      icon: "https://help.revealbi.io/img/logo.png",
      groups: ["Custom Vizualizations"]
    });
  }

}
