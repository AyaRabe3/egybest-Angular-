import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SeriesServiceService {

  constructor(private http:HttpClient) { }


  getAllSeries(){
    return this.http.get("http://localhost:4402/series/getAllSeries")
  }
}
