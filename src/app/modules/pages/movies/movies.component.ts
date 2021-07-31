import { Component, OnInit } from '@angular/core';
import { MoviesServiceService } from './movies-service.service';
import { CategoriesServiceService } from '../categories/categories-service.service';
export class Movies{
  constructor(
    public id:string,
    public movieName:string,
    public categoryId:string
  ){}
}
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  moviesList :Movies[]|any;

  constructor( private service:MoviesServiceService) { }

  ngOnInit(): void {
    this.getMoviesFromServer()
  }
  getMoviesFromServer(){
    this.service.getAllMovies().subscribe((res)=>{
    console.log("all movies",res)
    this.moviesList=res;
    },(error)=>{
    console.log(error)
    })
  }
  
}
