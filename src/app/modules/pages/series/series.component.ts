import { Component, OnInit } from '@angular/core';
import { SeriesServiceService } from './series-service.service';
import Swal from 'sweetalert2';


export class Series{
  constructor(
    public id:string,
    public name:string,
    public categoryId:string,
    public categoryName:string
  ){}
} 
@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {
  seriesList :Series[]|any;
  constructor(private service:SeriesServiceService) { }

  ngOnInit(): void {
    this.getSeriesFromServer()
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

}
