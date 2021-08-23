import { Component, OnInit } from '@angular/core';
import { SeriesServiceService } from './series-service.service';
import Swal from 'sweetalert2';
import { CategoriesServiceService } from '../categories/categories-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/Category';
import { Series } from 'src/app/interfaces/series';


@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {
  seriesList :Series[]|any;
  categoryList:Category[] |any;
  searchForm: FormGroup|any ;

  constructor(
    private service:SeriesServiceService,
    private _categoriesService :CategoriesServiceService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.getSeriesFromServer()
    this._categoriesService.getAllCategories().subscribe((res)=>{
    this.categoryList=res
    })
    
    this.searchForm=this.formBuilder.group
    ({
      // name: ['',  Validators.pattern('^[a-zA-Z \-\']+')],
      name: ['',  [Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$')]],
      categoryId:['',Validators.minLength(2)]
    })
  }

  getSeriesFromServer(){
    this.service.getAllSeries().subscribe((res)=>{
    this.seriesList=res
    },(error)=>{
    console.log(error)
  })
}

deleteSeries(id:string){
  this.service.deleteSeries(id).subscribe((res)=>{
    this.ngOnInit()
  },(error)=>{
    console.log(error)
  }
  )
}


confirmBoxOfDelete(id:string){  
  Swal.fire({  
    title: 'Are you sure want to remove this a series?',  
    text: 'You will not be able to recover this a series again!',  
    icon: 'warning',  
    showCancelButton: true,  
    confirmButtonText: 'Yes, delete it!',  
    cancelButtonText: 'No, keep it'  
  }).then((result) => {  
    if (result.value) {  
      this.deleteSeries(id)
    } 
  })  
} 

//search area//
get f() { return this.searchForm.controls; }

onChange(){
  console.log("hi", this.searchForm.value.categoryId)
  console.log("hi", this.searchForm.value)
  // this.search();
  if (this.searchForm.valid) 
  {
  this.service.search("",this.searchForm.value.categoryId).subscribe((res)=>{
    console.log("ressss from search",res)
    this.seriesList=res
  })
}
}

search(){
  this.service.search(this.searchForm.value.categoryId).subscribe((res)=>{
    console.log("ressss from search",res)
    this.seriesList=res
  })
}

onKeyUpSearch(event: KeyboardEvent){
  var inp = String.fromCharCode(event.keyCode);
  // if (/[a-zA-z]/.test(inp)==true) {
    console.log("event",event)
    if (this.searchForm.valid) 
    {
    this.service.search(this.searchForm.value.name,"").subscribe((res)=>{
      console.log("ressss from search",res)
      this.seriesList=res
    })
     }
    event.preventDefault();
  // }
}


onSubmitSearch(){
  if (this.searchForm.valid) 
        {
          this.service.search(this.searchForm.value.name,this.searchForm.value.categoryId).subscribe((res)=>{
            console.log("ressss from search",res)
            this.seriesList=res
          })  
  
        }
}
cancelSearch(){
  this.getSeriesFromServer()
  this.searchForm.reset();
}


}
