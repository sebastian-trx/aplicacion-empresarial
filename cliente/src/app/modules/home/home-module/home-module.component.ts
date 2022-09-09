import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-module',
  templateUrl: './home-module.component.html',
  styleUrls: ['./home-module.component.scss']
})
export class HomeModuleComponent implements OnInit {

  constructor(private router: Router) {
    
  }

 ngOnInit(): void {
 }

 crearJuego(): void {
   this.router.navigate(['game/new']);
 }

 consultarJuegos(): void{
   this.router.navigate(['game/lista']);
 }

}
