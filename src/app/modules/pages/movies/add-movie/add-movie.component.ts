import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CategoriesServiceService } from '../../categories/categories-service.service';
import { MoviesServiceService } from '../movies-service.service';
export class Categories{
  constructor(
    public id:string,
    public name:string,
    )
    {}
}
@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  formBuilder: any;
  constructor(private _categoriesService:CategoriesServiceService,private _movieService:MoviesServiceService) { }
 categories:Categories[]|any;
 movieForm: FormGroup|any ;
 submitted = false;
  ngOnInit(): void {
    this.getCategories()
    this.movieForm = this.formBuilder.group({
      name: ['', Validators.required],
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
    // stop here if form is invalid
    if (this.movieForm.invalid) 
        {
        return;
        }

    // display form values on success
     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.movieForm.value, null, 4));
     console.log(JSON.stringify(this.movieForm.value))
     this.addMovie(this.movieForm.value)
   }
   onReset() {
    this.submitted = false;
    this.movieForm.reset();
        }


    addMovie(movie:{}){
      this._movieService.addMovie(movie).subscribe(response => {
        console.log(response);
      })
      }

}
