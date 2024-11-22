import { Injectable } from '@angular/core';
import { Player } from '../../interfaces/player.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  addNewPlayer(name: string): void {
    this.setPlayers([
      ...this.getPlayers(),
      {
        id: this.getPlayers().length,
        name: name,
      },
    ]);
  }

  getPlayers(): Player[] {
    return JSON.parse(localStorage.getItem('players') || '[]') as Player[];
  }

  setPlayers(players: Player[]) {
    localStorage.setItem('players', JSON.stringify(players));
  }
}
