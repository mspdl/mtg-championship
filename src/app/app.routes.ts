import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreatePlayersComponent } from './pages/create-players/create-players.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { RoundComponent } from './pages/rounds/round/round.component';
import { RoundsComponent } from './pages/rounds/rounds.component';

export const routes: Routes = [
  { path: 'players', component: CreatePlayersComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'rounds', component: RoundsComponent },
  { path: 'round', component: RoundComponent },
  { path: '**', redirectTo: '/ranking', pathMatch: 'full' },
  { path: '', redirectTo: '/ranking', pathMatch: 'full' },
];
