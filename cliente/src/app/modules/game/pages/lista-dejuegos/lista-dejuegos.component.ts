import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-dejuegos',
  templateUrl: './lista-dejuegos.component.html',
  styleUrls: ['./lista-dejuegos.component.scss']
})
export class ListaDejuegosComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  entrarEnJuego(): void {
    this.router.navigate(['game/board']);
  }

}
