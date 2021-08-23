import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute ,Router } from '@angular/router';
import { Category } from 'src/app/interfaces/Category';
import { Movie } from 'src/app/interfaces/movie';
import Swal from 'sweetalert2';
import { CategoriesServiceService } from '../../categories/categories-service.service';
import { MoviesServiceService } from '../movies-service.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})

export class EditMovieComponent implements OnInit,OnDestroy{
  id: string |any ;
  private sub: any;
  // movieData:Movie[]|any;
  categories:Category[]|any;
  moviesToEditForm: FormGroup|any ;
  constructor(
    private route: ActivatedRoute,
    private _categoriesService:CategoriesServiceService,
    private _moviesService:MoviesServiceService,
    private builder:FormBuilder,
    private router :Router

  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
    this.id = params['id']; 
    })
    this.getCategories();
    this.getMovieData();
    this.moviesToEditForm=this.builder.group({
      name: ['', [Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$'),Validators.minLength(2)]],
      categoryId:[''],
    })
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  get f(){return this.moviesToEditForm.controls}
  getCategories(){
    this._categoriesService.getAllCategories().subscribe((res)=>{
    this.categories=res
    console.log("form series edit",this.categories)
  })
}
getMovieData(){
    this._moviesService.getMovieById(this.id).subscribe((res)=>{
    // this.movieData=res
    this.moviesToEditForm.value=res
    this.moviesToEditForm.get('categoryId').setValue(res.categoryId);
    this.moviesToEditForm.get('name').setValue(res.name);
    console.log("data of movie",this.moviesToEditForm.value.name)
  })
}


onSubmitEdit() {
  // this.submitted = true;
  if (this.moviesToEditForm.invalid) 
      {
        // alert('not invalid form!! :-)\n\n' + JSON.stringify(this.moviesToEditForm.value, null, 4));
      return;
      }

      console.log(JSON.stringify(this.moviesToEditForm.value))
      
      if(this.moviesToEditForm.value.name===""){
        delete this.moviesToEditForm.value.name;
        this._moviesService.updateMovie(this.id,this.moviesToEditForm.value).subscribe((res)=>{
          if (res){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: ' Movie has been updated successfully',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
        
      }
      else if(this.moviesToEditForm.value.categoryId===""){
       console.log(JSON.stringify({name:this.moviesToEditForm.value.name}))
       delete this.moviesToEditForm.value.categoryId;
       console.log(this.moviesToEditForm.value)
        this._moviesService.updateMovie(this.id,this.moviesToEditForm.value).subscribe((res)=>{
          if (res){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: ' Movie has been updated successfully',
              showConfirmButton: false,
              timer: 1500
               })
        }
      })

      }
      else{
        this._moviesService.updateMovie(this.id,this.moviesToEditForm.value).subscribe((res)=>{
          if (res){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: ' Movie has been updated successfully',
              showConfirmButton: false,
              timer: 1500
               })
    
        }
      })
      }
    this.router.navigate(['/movies']);

 }




}
