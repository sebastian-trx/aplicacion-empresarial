import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModuleRoutingModule } from './home-module-routing.module';
import { HomeModularizadoComponent } from './home-modularizado/home-modularizado.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HomeModularizadoComponent
  ],
  imports: [
    CommonModule,
    HomeModuleRoutingModule,
    MatButtonModule
  ]
})
export class HomeModuleModule { }
