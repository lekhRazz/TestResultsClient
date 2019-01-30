import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataComponent } from './components/data/data.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { AddRecordComponent } from './components/add-record/add-record.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  { path: 'home', component: DataComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'monitor', component: MonitorComponent },
  {path:'addrecord',component:AddRecordComponent},
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
                                  DataComponent,
                                  AnalysisComponent,
                                  MonitorComponent,
                                  PageNotFoundComponent,
                                  HeaderComponent,
                                  AddRecordComponent,
                                  LoginComponent
                                ]