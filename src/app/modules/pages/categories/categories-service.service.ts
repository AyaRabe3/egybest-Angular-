import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
// import {URI} from '';
const URI="http://localhost:4402/";
@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {
  constructor(private http:HttpClient) { }
   getAllCategories(){
   return this.http.get(`${URI}category/getCategories`)
  }

  getCategoryById(categoryId:string){
    let id =new HttpParams().set('categoryId',categoryId)
    return this.http.get(`localhost:4402/category/${id}`)
  }
  
}
