import { Component, OnInit } from '@angular/core';
import { CategoriesServiceService } from './categories-service.service';

export class Categories{
  constructor(
    public id:string,
    public name:string,
    public categoryId:string,
    public categoryName:string)
    {}
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesList : Categories[] | any;
  constructor(private service :CategoriesServiceService ,) { }
  ngOnInit(): void {
    this.getCategoriesFromServer();
  }
  

  getCategoriesFromServer():any{
    this.service.getAllCategories().subscribe((res)=>
      {
      console.log("categories from server",res)
      this.categoriesList = res;

      
    },
    (error)=>{console.log(error)})
  }
  

    // categoriesList =this.getCategoriesFromServer();

}
