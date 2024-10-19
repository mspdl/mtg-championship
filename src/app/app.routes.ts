import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreatePlayersComponent } from './components/create-players/create-players.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { NewRoundComponent } from './components/rounds/new-round/new-round.component';
import { RoundsComponent } from './components/rounds/rounds.component';

export const routes: Routes = [
  { path: 'players', component: CreatePlayersComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'rounds', component: RoundsComponent },
  { path: 'create-round', component: NewRoundComponent },
  { path: 'home', component: AppComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
