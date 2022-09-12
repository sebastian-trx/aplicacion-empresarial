import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JugadoresService } from '../../services/jugadores.service';

@Component({
  selector: 'app-lista-dejuegos',
  templateUrl: './lista-dejuegos.component.html',
  styleUrls: ['./lista-dejuegos.component.scss']
})
export class ListaDejuegosComponent implements OnInit {

  listaDejuegos:any

  constructor(private router:Router, private lista:JugadoresService) { }

  ngOnInit(): void {
    this.lista.listaDeJuegos("c3uF8AxQSkSQOG66j9RvIfTjomT2")
    .subscribe(respuesta => { 
      this.listaDejuegos = respuesta;
      console.log(this.listaDejuegos);
    })
  }

  

  entrarEnJuego(): void {
    this.router.navigate(['game/board']);
  }

}
