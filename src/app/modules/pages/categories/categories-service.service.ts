import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import {environment} from "src/environments/environment"
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/Category';
const URI=`${environment.URI}/category/`;
@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {
  constructor(private http:HttpClient) { }
   getAllCategories(){
   return this.http.get(`${URI}getCategories`)
  }

  getCategoryById(categoryId:string):Observable<Category>{
    return this.http.get<Category>(`${URI}${categoryId}`)
  }
  deleteCategoryById(categoryId:string){
    return this.http.delete(`${URI}${categoryId}`)
  }

  addCategory(category:{}){
    console.log("from service", category);
    return this.http.post<any>(`${URI}addCat`,category)

  }

  editCategory(id:string, data:{}) {
    return this.http.patch(`${URI}Edit/${id}`, data);
  }

  search(name:string){
   return this.http.get(`${URI}search/${name}`)
  }

}
