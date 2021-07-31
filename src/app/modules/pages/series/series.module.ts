import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { SeriesComponent } from './series.component';
import { AddSeriesComponent } from './add-series/add-series.component';
import { EditSeriesComponent } from './edit-series/edit-series.component';
 import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SeriesComponent,
    AddSeriesComponent,
    EditSeriesComponent
  ],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    HttpClientModule
    
  ]
})
export class SeriesModule { }
