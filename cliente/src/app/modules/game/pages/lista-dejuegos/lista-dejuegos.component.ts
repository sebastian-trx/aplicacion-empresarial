import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { JugadoresService } from '../../services/jugadores.service';

@Component({
  selector: 'app-lista-dejuegos',
  templateUrl: './lista-dejuegos.component.html',
  styleUrls: ['./lista-dejuegos.component.scss']
})
export class ListaDejuegosComponent implements OnInit {

  listaDejuegos:any
  currentUser!:any

  constructor(private auth$: AuthService, private router:Router, private lista$:JugadoresService) { }

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.auth$.getUserAuth();
    this.lista$.listaDeJuegos(this.currentUser?.uid)
    .subscribe(respuesta => { 
      this.listaDejuegos = respuesta;
      console.log(this.listaDejuegos);
    })
  }

  entrarEnJuego(id:string): void {
    this.lista$.iniciarJuego(id).subscribe()
    this.router.navigate([`game/board/${id}`]);
  }

  iniciarJuego(id:string): void{
    //ruta de prueba
    //this.router.navigate(['game/new']);
  }

}
