import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-modularizado',
  templateUrl: './home-modularizado.component.html',
  styleUrls: ['./home-modularizado.component.scss']
})
export class HomeModularizadoComponent implements OnInit {

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
