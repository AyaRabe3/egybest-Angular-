import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  addCategory(category:{}){
    console.log("from service", category);
    return this.http.post<any>(`${URI}addCat`,category)

  }

  editCategory(id:string, data:{}) {
    return this.http.patch(`${URI}/${id}`, data);
  }




  // read(id:string): Observable<any> {
  //   return this.http.get(`${URI}/${id}`);
  // }

  // create(data): Observable<any> {
  //   return this.http.post(URI, data);
  // }


  // delete(id): Observable<any> {
  //   return this.http.delete(`${URI}/${id}`);
  // }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(URI);
  // }

  // searchByName(name): Observable<any> {
  //   return this.http.get(`${URI}?name=${name}`);
  // }
}
