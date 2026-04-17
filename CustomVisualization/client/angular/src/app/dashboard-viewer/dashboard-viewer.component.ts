import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RevealSdkSettings, RVDashboard, RevealView } from 'reveal-sdk';

RevealSdkSettings.setBaseUrl("http://localhost:5111/")

@Component({
  selector: 'app-dashboard-viewer',
  templateUrl: './dashboard-viewer.component.html',
  styleUrls: ['./dashboard-viewer.component.scss']
})
export class DashboardViewerComponent implements AfterViewInit {

  @ViewChild('revealView') el!: ElementRef;

  async ngAfterViewInit() {
    let dashboard = await RVDashboard.loadDashboard("Sales");
    var revealView = new RevealView(this.el.nativeElement);
    revealView.dashboard = dashboard;

    //add custom vizualization to chart types drop down
    revealView.chartTypes.push({
      title: "HTML Table",
      url: "http://localhost:4200/table", //provide the url to your custom vizualization
      icon: "https://help.revealbi.io/img/logo.png",
      groups: ["Custom Vizualizations"]
    });

    revealView.chartTypes.push({
      title: "Pivot Grid",
      url: "http://localhost:4200/pivot-grid",
      icon: "https://help.revealbi.io/img/logo.png",
      groups: ["Custom Vizualizations"]
    });
  }

}
