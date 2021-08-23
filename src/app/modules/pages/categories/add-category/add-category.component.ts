import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoriesServiceService } from '../categories-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup|any ;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private _service :CategoriesServiceService,
    private router :Router ) { }

  ngOnInit(): void {
      this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$'),Validators.minLength(2)]],
      })
  }
  get f() { return this.categoryForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.categoryForm.invalid) 
        {
        return;
        }
     console.log(JSON.stringify(this.categoryForm.value))
     this.addCategory(this.categoryForm.value)
     this.router.navigate(['/categories']);

   }
   onReset() {
    this.submitted = false;
    this.categoryForm.reset();
}

    addCategory(cat:{}){
      this._service.addCategory(cat).subscribe(response => {
        console.log(response);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: ' Movie has been added successfully',
          showConfirmButton: false,
          timer: 1500
           })
        
      })
      }

}
