import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MoviesComponent,
    AddMovieComponent,
    EditMovieComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    HttpClientModule
  ]
})
export class MoviesModule { }
