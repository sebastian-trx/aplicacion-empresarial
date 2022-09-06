// Libraries
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Material
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'


// Routers
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './templates/cards/app.component';

// Environments
import { environment } from 'src/environments/environment';

// Components
import { NewGameComponent } from './modules/game/pages/new-game/new-game.component';
import { LogInComponent } from './modules/game/pages/log-in/log-in.component';
import { BoardComponent } from './modules/game/pages/board/board.component';
import { HomeComponent } from './modules/game/pages/home/home.component';
import { ListaDejuegosComponent } from './modules/game/pages/lista-dejuegos/lista-dejuegos.component';

@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
    LogInComponent,
    BoardComponent,
    HomeComponent,
    ListaDejuegosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
