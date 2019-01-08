import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ReactiveFormsModule} from '@angular/forms';
import{ FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { TraineeService } from './shared-service/trainee.service';
import { SearchByNamePipe } from './components/data/search-by-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SearchByNamePipe
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [TraineeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
