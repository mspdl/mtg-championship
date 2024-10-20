import { Injectable } from '@angular/core';
import { Player } from '../../interfaces/player.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  addNewPlayer(name: string): void {
    const players = this.getPlayers();
    const newPlayer = {
      id: players.length,
      name: name,
      winTimes: 0,
      score: 0,
      win2x0Times: 0,
      win2x1Times: 0,
    };
    players.push(newPlayer);
    this.setPlayers(players);
  }

  getPlayers(): Player[] {
    return JSON.parse(localStorage.getItem('players') || '[]') as Player[];
  }

  getPlayersByRanking(): Player[] {
    return this.getPlayers().sort((a, b) =>
      a.score < b.score ? 1 : b.score < a.score ? -1 : 0
    );
  }

  setPlayers(players: Player[]) {
    localStorage.setItem('players', JSON.stringify(players));
  }
}
