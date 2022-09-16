import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { JugadoresService } from '../../services/jugadores.service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  juegoId: any;
  jugadorId: any;
  mazoJugador: any[] = [];
  cartasDelTablero: any = [];
  cartasganadasEnRonda: any = [];
  tiempo: number = 0;
  jugadores!: number 
  ronda!:number


  constructor(
    private route: ActivatedRoute,
    private websocket: WebsocketService,
    private juego$: JugadoresService,
    private auth$: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((paramMap: any) => {
      this.juegoId = paramMap.params.id;
    });

    this.jugadorId = await this.auth$.getUserAuth();

    this.juego$.mazoDeCartas(this.jugadorId?.uid).subscribe((item: any) => {
      this.mazoJugador = item[0].cartas;
      console.log(this.mazoJugador);
    });

    this.juego$.tablero(this.juegoId).subscribe((item:any) => {
      this.ronda = item.ronda.numero
      this.jugadores = item.ronda.jugadores.length
      
    })

    this.websocket.conect(this.juegoId).subscribe({
      next: (message: any) => {
        //eventos
        if (message.type === 'cardgame.tiempocambiadodeltablero') {
          this.tiempo = message.tiempo;
        }
        if (message.type === 'cardgame.cartasasignadasajugador') {
          //encapsular en un metodo:
          if(this.jugadorId?.uid === message.ganadorId.uuid){
            this.cartasganadasEnRonda = message.cartasApuesta.map((item:any) => {
              return {
                cartaId: item.cartaId.uuid,
                estaOculta: item.estaOculta,
                estaHabilitada: item.estaHabilitada,
                poder: item.poder,
              };
            });
            this.mazoJugador.push(...this.cartasganadasEnRonda)
          }
          console.log('cartasasignadasajugador');
        }
        if (message.type === 'cardgame.rondaterminada') {
          this.cartasDelTablero = [];
          console.log('rondaterminada');
        }
        if (message.type === 'cardgame.rondacreada') {
          this.ronda = message.ronda.numero
          this.jugadores = message.ronda.jugadores.length
          console.log('rondacreada');
        }
        if (message.type === 'cardgame.juegofinalizado') {
          console.log('juegofinalizado');
          // jugadorid === a message.gandanador? ganó : perdió
          alert(`felicitaciones ${message.alias} has ganado`)
          this.router.navigate(['game/new']);
        }
        if (message.type === 'cardgame.cartaquitadadelmazo') {
          this.mazoJugador = this.mazoJugador.filter(
            (carta) => carta.cartaId !== message.carta.cartaId.uuid
          );
          console.log('cartaquitadadelmazo');
        }
        if (message.type === 'cardgame.ponercartaentablero') {
          this.cartasDelTablero.push({
            cartaId: message.carta.cartaId.uuid,
            poder: message.carta.poder,
            estaOculta: message.carta.estaOculta,
            estaHabilitada: message.carta.estaHabilitada,
          });
        }

        console.log(message);
      },
      error: (error: any) => console.log(error),
      complete: () => console.log('completado'),
    });
  }

  iniciarRonda(): void {
    this.juego$.iniciarRonda(this.juegoId).subscribe();
  }

  apostar(cartaId: string) {
    this.juego$.apostar({
      jugadorId: this.jugadorId?.uid,
      cartaId: cartaId,
      juegoId: this.juegoId,
    }).subscribe();
  }
}
