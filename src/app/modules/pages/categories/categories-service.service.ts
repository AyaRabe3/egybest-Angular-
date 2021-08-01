import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
const URI="http://localhost:4402/category/";
@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {
  constructor(private http:HttpClient) { }
   getAllCategories(){
   return this.http.get(`${URI}getCategories`)
  }

  getCategoryById(categoryId:string){
    let id =new HttpParams().set('categoryId',categoryId)
    return this.http.get(`${URI}${id}`)
  }
  deleteCategoryById(categoryId:string){
    // let id =new HttpParams().set('categoryId',categoryId)
    return this.http.delete(`${URI}${categoryId}`)
  }
  // 610504ea88e53b3a8c65aa56
}
