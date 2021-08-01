import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const URI="http://localhost:4402/movies/"
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
}
