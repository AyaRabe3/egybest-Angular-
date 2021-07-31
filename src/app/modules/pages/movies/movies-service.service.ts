import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {

  constructor(private http :HttpClient) { }

  getAllMovies(){
    return this.http.get("http://localhost:4402/movies/getAllMovies")
  }
}
