import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { JugadoresService } from '../../services/jugadores.service';
import firebase from 'firebase/compat';
import { Game } from '../../models/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  frmJugadores: FormGroup;
  jugadores!: Array<Usuario>;
  currentUser!: firebase.User | null

  constructor(private jugadores$: JugadoresService, private auth$: AuthService, private router: Router) {
    this.frmJugadores = this.createFormJugadores();
  }

  async ngOnInit(): Promise<void> {
    this.jugadores = await this.jugadores$.getJugadores();
    this.currentUser = await this.auth$.getUserAuth();
    this.jugadores = this.jugadores.filter(item => item.id !== this.currentUser?.uid);
  }

  public submit(): void {
    const gamers = this.frmJugadores.getRawValue();
    gamers.jugadores.push(this.currentUser?.uid);
    console.log("Submit", gamers);
    this.jugadores$.game(gamers).subscribe({
      next: (data: Game) => {
        // Aquí hago algo con la información que llega del backend
        console.log("Game", data);
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log("Completed");
      }
    });
  }

  private createFormJugadores(): FormGroup {
    return new FormGroup({
      jugadores: new FormControl(null, [Validators.required]),
    });
  }

  crearJuego(): void {
    this.router.navigate(['game/board']);
  }

  btnLogout(): void {
    this.auth$.logout();
  }

}
