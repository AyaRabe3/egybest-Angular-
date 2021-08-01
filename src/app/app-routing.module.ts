import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './modules/layout/main/main.component';
import { HomeComponent } from './modules/pages/home/home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
      path:'',
      // component:MainComponent,
      children:[
        {
          path: 'home',
          component: HomeComponent
         },
          {
            path: 'categories',
            loadChildren: () => import('./modules/pages/categories/categories.module')
              .then(m => m.CategoriesModule)
           },
          {
            path: 'series',
            loadChildren: () => import('./modules/pages/series/series.module')
              .then(m => m.SeriesModule)
           },
          {
            path: 'movies',
            loadChildren: () => import('./modules/pages/movies/movies.module')
              .then(m => m.MoviesModule)
           }

      ]
    },
    { path: '**', redirectTo: '/home' }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
