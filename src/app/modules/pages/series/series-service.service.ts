import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const URI="http://localhost:4402/series/";
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
}
