import { Component, OnInit } from '@angular/core';
import { MoviesServiceService } from './movies-service.service';
import { CategoriesServiceService } from '../categories/categories-service.service';
import Swal from 'sweetalert2';
export class Movies{
  constructor(
    public id:string,
    public movieName:string,
    public categoryId:string
  ){}
}
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  moviesList :Movies[]|any;

  constructor( private service:MoviesServiceService) { }

  ngOnInit(): void {
    this.getMoviesFromServer()
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
  
}
