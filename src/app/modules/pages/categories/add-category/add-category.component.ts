import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesServiceService } from '../categories-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  // for remember You must use 'Definite Assignment Assertion' to tell typescript that this variable will have a value at runtime as follows
  categoryForm: FormGroup|any ;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private _service :CategoriesServiceService ) { }



  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
  })
  }
  get f() { return this.categoryForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.categoryForm.invalid) 
        {
        return;
        }

    // display form values on success
     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.categoryForm.value, null, 4));
     console.log(JSON.stringify(this.categoryForm.value))
     this.addCategory(this.categoryForm.value)
   }
   onReset() {
    this.submitted = false;
    this.categoryForm.reset();
}


    addCategory(cat:{}){
      this._service.addCategory(cat).subscribe(response => {
        console.log(response);
        
      })
      }


}
