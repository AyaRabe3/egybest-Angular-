import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { MoviesComponent } from './movies.component';

const routes: Routes = [
  {
    path:'',
    children:
    [
      {
        path:'',
        component:MoviesComponent,
      },
      {
        path:'add',
        component:AddMovieComponent
      },
      {
        path:'edit/:id',
        component:EditMovieComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
