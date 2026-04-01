import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './custom-visualizations/table/table.component';
import { PivotGridComponent } from './custom-visualizations/pivot-grid/pivot-grid.component';
import { DashboardViewerComponent } from './dashboard-viewer/dashboard-viewer.component';

const routes: Routes = [
  { path: "", component: DashboardViewerComponent },
  { path: "table", component: TableComponent },
  { path: "pivot-grid", component: PivotGridComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
