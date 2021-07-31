import { Component, OnInit } from '@angular/core';
import { SeriesServiceService } from './series-service.service';

export class Series{
  constructor(
    public id:string,
    public name:string,
    public categoryId:string
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

}
