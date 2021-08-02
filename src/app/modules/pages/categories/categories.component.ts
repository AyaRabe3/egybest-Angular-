import { Component, OnInit,Input } from '@angular/core';
import { CategoriesServiceService } from './categories-service.service';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
export class Categories{
  constructor(
    public id:string,
    public name:string,
    )
    {}
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoriesList : Categories[] | any;
  constructor(private service :CategoriesServiceService ,public readonly swalTargets: SwalPortalTargets) { }
  ngOnInit(
    
    ): void {
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
  


}
