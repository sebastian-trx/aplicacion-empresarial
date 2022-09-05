// Libraries
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
// const redirectLoggedInToDashboard = () => redirectLoggedInTo(['game/new']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['game/home']);

// Guards
// import { EjemploGuard } from './modules/game/guards/ejemplo.guard';

// Components
import { LogInComponent } from './modules/game/pages/log-in/log-in.component';
import { NewGameComponent } from './modules/game/pages/new-game/new-game.component';
import { BoardComponent } from './modules/game/pages/board/board.component';
import { HomeComponent } from './modules/game/pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: 'game/new',
    component: NewGameComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'game/board',
    component: BoardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'game/home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  }
  // {
  //   path: 'game/:id',
  //   canActivate: [ EjemploGuard ],
  //   children: [
  //     {
  //       path: 'new',
  //       component: NewGameComponent,
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
