import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CategoriesServiceService } from '../../categories/categories-service.service';
import { SeriesServiceService } from '../series-service.service';
import { Category } from 'src/app/interfaces/Category';
import { Series } from 'src/app/interfaces/series';

@Component({
  selector: 'app-edit-series',
  templateUrl: './edit-series.component.html',
  styleUrls: ['./edit-series.component.scss']
})
export class EditSeriesComponent implements OnInit ,OnDestroy{
  id: string |any ;
  private sub: any;
  seriesData:Series[]|any;
  categories:Category[]|any;

  seriesToEditForm: FormGroup|any ;

  constructor(
    private route: ActivatedRoute,
    private _seriesService:SeriesServiceService,
    private _categoriesService:CategoriesServiceService,
    private formBuilder: FormBuilder,
    private router :Router
    ) { }


    ngOnInit(): void {
      this.sub = this.route.params.subscribe(params => {
        this.id = params['id']; 
      });
    this.getSeriesData()
    this.getCategories()
    this.seriesToEditForm=this.formBuilder.group({
      name: ['', [Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$'),Validators.minLength(2)]],
      categoryId:[''],
    })
  }

  getCategories(){
    this._categoriesService.getAllCategories().subscribe((res)=>{
    this.categories=res
    console.log("form series edit",this.categories)
       })
}
  
    ngOnDestroy() {
      this.sub.unsubscribe();
    }
  get f(){return this.seriesToEditForm.controls;}
  
  getSeriesData(){
    this._seriesService.getMovieById(this.id).subscribe((res)=>{
      this.seriesData=res
      this.seriesToEditForm.value=res
      this.seriesToEditForm.get('categoryId').setValue(res.categoryId)
      this.seriesToEditForm.get('name').setValue(res.name);
      console.log("data",this.seriesToEditForm.value.name)
    })
  }

  onSubmitEdit() {
    // this.submitted = true;
    if (this.seriesToEditForm.invalid) 
        {
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.seriesToEditForm.value, null, 4));

        return;
        }
        console.log(JSON.stringify(this.seriesToEditForm.value))
        
        if(this.seriesToEditForm.value.name===""){
          delete this.seriesToEditForm.value.name;
          this._seriesService.updateSeries(this.id,this.seriesToEditForm.value).subscribe((res)=>{
            if (res){
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: ' A series has been updated successfully',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
          
        }
        else if(this.seriesToEditForm.value.categoryId===""){
         console.log(JSON.stringify({name:this.seriesToEditForm.value.name}))
         delete this.seriesToEditForm.value.categoryId;
         console.log(this.seriesToEditForm.value)
        //  let newSeries=JSON.stringify({name:this.seriesToEditForm.value.name})
          this._seriesService.updateSeries(this.id,this.seriesToEditForm.value).subscribe((res)=>{
            if (res){
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: ' A series has been updated successfully',
                showConfirmButton: false,
                timer: 1500
                 })
          }
        })

        }
        else{
          this._seriesService.updateSeries(this.id,this.seriesToEditForm.value).subscribe((res)=>{
            if (res){
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: ' A series has been updated successfully',
                showConfirmButton: false,
                timer: 1500
                 })
      
          }
        })
        }
      this.router.navigate(['/series']);

   }

}
