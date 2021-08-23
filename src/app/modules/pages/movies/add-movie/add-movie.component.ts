import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { CategoriesServiceService } from '../../categories/categories-service.service';
import { MoviesServiceService } from '../movies-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/Category';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  
 constructor(
   private formBuilder: FormBuilder,
   private _categoriesService:CategoriesServiceService,
   private _movieService:MoviesServiceService,
   private router: Router) { }
 categories:Category[]|any;
 movieForm: FormGroup|any ;
 submitted = false;
  ngOnInit(): void {
    this.getCategories()
    this.movieForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$'),Validators.minLength(2)]],
      categoryId:['', Validators.required]
  })
  }

  getCategories(){
      this._categoriesService.getAllCategories().subscribe((res)=>{
      this.categories=res
      console.log("form movie add",this.categories)
    })
  }

// 
get f() { return this.movieForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.movieForm.invalid) 
        {
          // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.movieForm.value, null, 4));
        return;
        }
        console.log(JSON.stringify(this.movieForm.value))
        // this.addMovie(this.movieForm.value)
        this._movieService.addMovie(this.movieForm.value).subscribe((res)=>{
          if (res){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: ' Movie has been added successfully',
              showConfirmButton: false,
              timer: 1500
               })
    
        }
      })
      this.router.navigate(['/movies']);

   }
   onReset() {
    this.submitted = false;
    this.movieForm.reset();
        }
  onCategoryChange() {
          console.log("sdffffffffffffffff",this.movieForm.value.categoryId)
          let category  = this.movieForm.value.categoryId;	
          console.log('category Changed: ' + category);
       } 
   addMovie(movie:{}){
      this._movieService.addMovie(movie).subscribe(response => {
        console.log(response);
      })
      }

 
}
