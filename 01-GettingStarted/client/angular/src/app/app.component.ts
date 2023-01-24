import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare let $: any;
$.ig.RevealSdkSettings.setBaseUrl("http://localhost:5111");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  @ViewChild('revealView') el!: ElementRef;

  ngAfterViewInit(): void {
      var revealView = new $.ig.RevealView(this.el.nativeElement);
  }
  
}
