import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute ,Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriesServiceService } from '../categories-service.service';
import { Category } from '../../../../interfaces/Category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})

export class EditCategoryComponent implements OnInit,OnDestroy {
  id: string |any ;
  private sub: any;
  editCategoryForm:FormGroup|any;
  // categoryData:Category[]|any;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private _categoryService:CategoriesServiceService,
    private builder:FormBuilder

  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      })
      this.getCatData()
      this.editCategoryForm=this.builder.group({
        name: ['', [Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$'),Validators.minLength(2)]]
      })
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getCatData(){
      this._categoryService.getCategoryById(this.id).subscribe((res)=>{
      // this.categoryData=res
      this.editCategoryForm.value=res
      this.editCategoryForm.get('name').setValue(res.name);
      console.log("category to edit",this.editCategoryForm)
    })
  }
  get f(){return this.editCategoryForm.controls}
  onSubmitEdit(){
    if(this.editCategoryForm.valid){   
       this._categoryService.editCategory(this.id,this.editCategoryForm.value).subscribe((res)=>
       {
        if (res){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: ' Movie has been updated successfully',
            showConfirmButton: false,
            timer: 1500
             })
          }
         this.router.navigate(['/categories'])
       })
     }
  }

}
