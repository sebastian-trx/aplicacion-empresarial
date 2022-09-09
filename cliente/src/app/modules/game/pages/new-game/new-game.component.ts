import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { JugadoresService } from '../../services/jugadores.service';
import firebase from 'firebase/compat';
import { Game } from '../../models/game.model';
import { Router } from '@angular/router';
import { WebsocketService } from '../../services/websocket.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit,OnDestroy {
  frmJugadores: FormGroup;
  jugadores!: Array<Usuario>;
  currentUser!: firebase.User | null;
  id = uuidv4();

  constructor(
    private jugadores$: JugadoresService,
    private auth$: AuthService,
    private router: Router,
    private websocket:WebsocketService,
  ) {
    this.frmJugadores = this.createFormJugadores();
    this.id = uuidv4();
  }

  async ngOnInit(): Promise<void> {
    this.jugadores = await this.jugadores$.getJugadores();
    this.currentUser = await this.auth$.getUserAuth();
    this.jugadores = this.jugadores.filter(
      (item) => item.id !== this.currentUser?.uid
    );
    this.websocket.conect(this.id).subscribe({
      next:(message:any) => {
        console.log(message)
        this.router.navigate(['game/lista'])
      },
      error:(error:any) => console.log(error),
      complete:()=> {
        console.log("completado")
      }
    });
  }

  ngOnDestroy(): void {
      this.websocket.close();
  }

  public submit(): void {
    const gamers = this.frmJugadores.getRawValue();
    gamers.jugadores.push(this.currentUser?.uid);
    console.log('Submit', gamers);
    this.jugadores$.game(gamers).subscribe({
      next: (data: Game) => {
        
        console.log('Game', data);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }

  private createFormJugadores(): FormGroup {
    return new FormGroup({
      jugadores: new FormControl(null, [Validators.required]),
    });
  }

  crearJuego(): void {
    //this.router.navigate(['game/lista']);
    this.jugadores$
      .crearJuego({
        "juegoId": this.id,
        "jugadores": {
          "uid-asd": "raul",
          "uid-zxc": "andres"
        },
        "jugadorPrincipalId": "uid-asd"
      })
      .subscribe((data) => {
        //console.log(data);
      });
  }

  btnLogout(): void {
    this.auth$.logout();
  }
}
