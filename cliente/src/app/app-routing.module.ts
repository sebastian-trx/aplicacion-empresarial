// Libraries
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['game/homeModule']);

// Guards
// import { EjemploGuard } from './modules/game/guards/ejemplo.guard';

// Components
import { LogInComponent } from './modules/game/pages/log-in/log-in.component';
import { NewGameComponent } from './modules/game/pages/new-game/new-game.component';
import { BoardComponent } from './modules/game/pages/board/board.component';
import { HomeComponent } from './modules/game/pages/home/home.component';
import { ListaDejuegosComponent } from './modules/game/pages/lista-dejuegos/lista-dejuegos.component';

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
  },
  {
    path: 'game/lista',
    component: ListaDejuegosComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
 
  {
    path: 'game/homeModule',
    canActivate: [AngularFireAuthGuard],
    loadChildren: () =>
      import('./modules/home-module/home-module.module').then(m => m.HomeModuleModule),
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
