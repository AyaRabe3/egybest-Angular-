import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [
    NavBarComponent,
    SideBarComponent,
    LayoutComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports:[
    // NavBarComponent,
    // SideBarComponent,
    // LayoutComponent,
    MainComponent
  ]
})
export class LayoutModule { }
