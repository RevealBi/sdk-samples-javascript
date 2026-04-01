import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxPivotGridModule } from 'igniteui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './custom-visualizations/table/table.component';
import { PivotGridComponent } from './custom-visualizations/pivot-grid/pivot-grid.component';
import { DashboardViewerComponent } from './dashboard-viewer/dashboard-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    PivotGridComponent,
    DashboardViewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IgxPivotGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
