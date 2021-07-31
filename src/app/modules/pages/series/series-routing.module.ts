import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AddSeriesComponent } from './add-series/add-series.component';
import { EditSeriesComponent } from './edit-series/edit-series.component';
import { SeriesComponent } from './series.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', 
        component: SeriesComponent,
      },
      {
        path: 'add', 
        component: AddSeriesComponent,
      },
      {
        path: 'edit', 
        component: EditSeriesComponent,
      },
      { path: '**', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeriesRoutingModule { }
