import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/app/interfaces/movie';
import { Observable } from 'rxjs/internal/Observable';
const URI=`${environment.URI}/movies/`;
@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {

  constructor(private http :HttpClient) { }

  getAllMovies(){
    return this.http.get(`${URI}getAllMovies`)
  }

  deleteMovie(id:string){
    return this.http.delete(`${URI}${id}`)
  }
  addMovie(movie:{}){
    return this.http.post(`${URI}addMovie`,movie)
  }
  search(name?:string,categoryId?:string){
    return this.http.post(`${URI}search/${name}`,{categoryId:categoryId})
  }

  getMovieById(id:string):Observable<Movie>{
    return this.http.get<Movie>(`${URI}${id}`)
  } 
  updateMovie(id:string,newMovie:{}){
    return this.http.patch(`${URI}Edit/${id}`,newMovie)
  } 
}
