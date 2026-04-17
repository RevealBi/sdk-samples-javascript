import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RevealSdkSettings, RevealView } from 'reveal-sdk';

RevealSdkSettings.setBaseUrl("http://localhost:5111");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('revealView') el!: ElementRef;

  ngAfterViewInit(): void {
    new RevealView(this.el.nativeElement);
  }

}
