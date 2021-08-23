import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
const URI=`${environment.URI}/series/`;
@Injectable({
  providedIn: 'root'
})
export class SeriesServiceService {

  constructor(private http:HttpClient) { }


  getAllSeries(){
    return this.http.get(`${URI}getAllSeries`)
  }
  deleteSeries(id:string){
   return this.http.delete(`${URI}${id}`)
  }

  addSeries(series:{}){
    return this.http.post(`${URI}addSeries`,series)
  }
  search(name?:string,categoryId?:string){
    return this.http.post(`${URI}search/${name}`,{categoryId:categoryId})
  }
  getMovieById(id:string):Observable<Movie>{
    return this.http.get<Movie>(`${URI}${id}`)
  } 
  updateSeries(id:string,newSeries:{}){
    return this.http.patch(`${URI}Edit/${id}`,newSeries)
  } 


}
