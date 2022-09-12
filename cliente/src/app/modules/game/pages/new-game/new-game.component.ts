import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { JugadoresService } from '../../services/jugadores.service';
import firebase from 'firebase/compat';
import { Game } from '../../models/game.model';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import { v4 as uuidv4 } from 'uuid';

interface Jugador {
  id: string;
  name: string;
}

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit, OnDestroy {
  frmJugadores: FormGroup;
  // jugadores!: Array<Usuario>;
  jugadores!: Array<any>;
  jugadoresCompletos!: Array<any>;
  currentUser!: firebase.User | null;
  id = uuidv4();
  jugadoresSeleccionados: Jugador[] = [];
  usuarioActual:Jugador[] =[]

  constructor(
    private jugadores$: JugadoresService,
    private auth$: AuthService,
    private router: Router,
    private websocket: WebsocketService
  ) {
    this.frmJugadores = this.createFormJugadores();
    this.id = uuidv4();
  }

  async ngOnInit(): Promise<void> {
    this.jugadores = await this.jugadores$.getJugadores();
    this.jugadoresCompletos = await this.jugadores$.getJugadores();
    this.currentUser = await this.auth$.getUserAuth();

    this.jugadores = this.jugadores.filter(
      (item) => item.id !== this.currentUser?.uid
    );

    this.usuarioActual= this.jugadoresCompletos.filter(
      (item) => item.id === this.currentUser?.uid);

    this.websocket.conect(this.id).subscribe({
      next: (message: any) => {
        this.router.navigate(['game/lista']);
      },
      error: (error: any) => console.log(error),
      complete: () => {
        console.log('completado');
      },
    });
  }

  ngOnDestroy(): void {
    this.websocket.close();
  }

  // public submit(): void {
  //   const gamers = this.frmJugadores.getRawValue();
  //   gamers.jugadores.push(this.currentUser?.uid);
  //   console.log('Submit', gamers);
  //   this.jugadores$.game(gamers).subscribe({
  //     next: (data: Game) => {
  //       console.log('Game', data);
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('Completed');
  //     },
  //   });
  // }

  private createFormJugadores(): FormGroup {
    return new FormGroup({
      jugadores: new FormControl(null, [Validators.required]),
    });
  }

  crearJuego(): void {
    const objeto: any = {};
    this.jugadoresSeleccionados.map((item) => (objeto[item.id] = item.name));

    this.jugadores$
      .crearJuego({
        juegoId: this.id,
        jugadores: objeto,
        jugadorPrincipalId: this.currentUser?.uid,
      })

      .subscribe((data) => {});
  }

  btnLogout(): void {
    this.auth$.logout();
  }

  change(e: any) {
    this.jugadoresSeleccionados = this.jugadores
      .filter((jugador) =>e.value.includes(jugador.id));

    this.jugadoresSeleccionados.push(...this.usuarioActual);
    console.log(this.jugadoresSeleccionados)
  }
}
