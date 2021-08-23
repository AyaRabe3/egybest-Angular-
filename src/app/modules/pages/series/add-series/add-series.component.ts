import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/Category';
import { CategoriesServiceService } from 'src/app/modules/pages/categories/categories-service.service';
import Swal from 'sweetalert2';
import { SeriesServiceService } from '../series-service.service';
@Component({
  selector: 'app-add-series',
  templateUrl: './add-series.component.html',
  styleUrls: ['./add-series.component.scss']
})
export class AddSeriesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private _categoriesService: CategoriesServiceService,
    private _seriesService: SeriesServiceService,
    private router: Router) { }
  seriesForm: FormGroup | any;
  submitted = false;
  categories: Category[] | any;
  ngOnInit(): void {
    this.getCategories();
    this.seriesForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$'), Validators.minLength(2)]],
      categoryId: ['', Validators.required]
    })
  }
  // '^[a-zA-Z \-\']+'
  getCategories() {
    this._categoriesService.getAllCategories().subscribe((res) => {
      this.categories = res
      console.log("form series add", this.categories)
    })
  }

  get f() { return this.seriesForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.seriesForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.seriesForm.value))
    this._seriesService.addSeries(this.seriesForm.value).subscribe((res) => {
      if (res) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '  A Series has been added successfully',
          showConfirmButton: false,
          timer: 1500
        })

      }
    })
    this.router.navigate(['/series']);

  }
  onReset() {
    this.submitted = false;
    this.seriesForm.reset();
  }
  onCategoryChange() {
    console.log("aya", this.seriesForm.value.categoryId)
    let category = this.seriesForm.value.categoryId;
    console.log('category Changed: ' + category);
  }
}
