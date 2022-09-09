import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModuleComponent } from './home-module/home-module.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    HomeModuleComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports:[HomeModuleComponent]
})
export class HomeModule { }
