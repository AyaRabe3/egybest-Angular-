import { Component, OnInit,Input } from '@angular/core';
import { CategoriesServiceService } from './categories-service.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../interfaces/Category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesList : Category[] | any;
  searchForm:FormGroup[]|any;
  constructor(
    private service :CategoriesServiceService ,
    private builder:FormBuilder
    ) { }
  ngOnInit(): void {
      this.getCategoriesFromServer();
      this.searchForm=this.builder.group({
       name:['',[Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$')]]
      })
    } 
    
    getCategoriesFromServer():any{
      this.service.getAllCategories().subscribe((res)=>
      {
        console.log("categories from server",res)
        this.categoriesList = res;
      },
      (error)=>{console.log(error)})
    }
    
    deleteCategory(id:string){
      console.log(this.categoriesList)
      this.service.deleteCategoryById(id).subscribe((res)=>{
        console.log("categories from server",res)
        this.getCategoriesFromServer();
        // this.ngOnInit(); //reload the table
      },
      (error)=>{console.log(error)}
      )
    }
    confirmBoxOfDelete(id:string){  
      Swal.fire({  
        title: 'Are you sure want to remove this category?',  
        text: 'You will not be able to recover this category again!',  
        icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        this.deleteCategory(id)
      } 
    })  
  } 
  

  confirmSearch(){
    if(this.searchForm.valid)
    {
       this.service.search(this.searchForm.value.name).subscribe((res)=>
       {
          console.log("res search",res)
          this.categoriesList=res
       })
    }
  }

onKeyUpSearch(){
  if(this.searchForm.valid)
    {
       this.service.search(this.searchForm.value.name).subscribe((res)=>
       {
          console.log("res search",res)
          this.categoriesList=res
       })
    }
}
cancelSearch(){
  this.getCategoriesFromServer();
  this.searchForm.reset();
}
}
