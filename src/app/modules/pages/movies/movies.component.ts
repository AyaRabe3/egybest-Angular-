import { Component, OnInit,Input } from '@angular/core';
import { MoviesServiceService } from './movies-service.service';
import { CategoriesServiceService } from '../categories/categories-service.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/Category';
import { Movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  moviesList :Movie[]|any;
  submitted = false;
  categories:Category[]|any;
  searchForm: FormGroup|any ;
 
  constructor( 
    private service:MoviesServiceService,
    private formBuilder: FormBuilder,
    private _categoriesService:CategoriesServiceService,
    private router: Router
    ) { }
  
  ngOnInit(): void {
    this.getMoviesFromServer()
    this.getCategories();
    this.searchForm = this.formBuilder.group({
      name: ['',   [Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$')]],
      categoryId:['',Validators.minLength(2)]
  })
  }
  getMoviesFromServer(){
    this.service.getAllMovies().subscribe((res)=>{
    console.log("all movies",res)
    this.moviesList=res;
    },(error)=>{
    console.log(error)
    })
  }

  deleteMovie(id:string){
   this.service.deleteMovie(id).subscribe((res)=>
  {
   this.getMoviesFromServer()
  },(error)=>{
    console.log(error)
  }
   )
  }
  
  confirmBoxOfDelete(id:string){  
    Swal.fire({  
      title: 'Are you sure want to remove this movie?',  
      text: 'You will not be able to recover this movie again!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        this.deleteMovie(id)
      } 
    })  
  } 

  
  getCategories(){
      this._categoriesService.getAllCategories().subscribe((res)=>{
      this.categories=res
      console.log("form movie add",this.categories)
    })
  }
  get f() { return this.searchForm.controls; }
 
    onReset() {
    this.submitted = false;
    this.searchForm.reset();
        }

    onCategoryChange(){
        // this.search();
        let  formId=this.searchForm.value.categoryId;
        if(this.searchForm.valid){
        this.service.search("",formId).subscribe((res)=>{
          console.log("ressss from search",res)
          this.moviesList=res
        })
      }
      }
      
      // search(){
      //   this.service.search(this.searchForm.value.categoryId).subscribe((res)=>{
      //     console.log("ressss from search",res)
      //     this.moviesList=res
      //   })
      // }
      
      onKeyUpSearch(event: KeyboardEvent){
        let formName=this.searchForm.value.name;
        var inp = String.fromCharCode(event.keyCode);
          console.log("event",event)
          if(this.searchForm.valid){
            this.service.search(formName,"").subscribe((res)=>{
              console.log("ressss from search",res)
              this.moviesList=res
            })
            // event.preventDefault();
          }
      }
      
      onSubmitSearch(){
        let formName=this.searchForm.value.name;
        let  formId=this.searchForm.value.categoryId;
        if(this.searchForm.valid){
        this.service.search(formName,formId).subscribe((res)=>{
          console.log("ressss from search",res)
          this.moviesList=res
        })  
      }
      }
      cancelSearch(){
        this.getMoviesFromServer()
        this.searchForm.reset();
      }

}
