import { Injectable } from '@angular/core';
import { Round } from '../../interfaces/round.interface';
import { PlayerService } from '../player/player.service';
import { ScoreService } from './../score/score.service';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  private readonly LOCAL_ROUNDS = 'rounds';

  constructor(
    private readonly playerService: PlayerService,
    private readonly scoreService: ScoreService
  ) {}

  createNewRound() {
    const players = this.playerService.getPlayers();
    const round: Round = { id: this.getRounds().length + 1, games: [] };
    let count = 1;
    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < players.length; j++) {
        if (i < j) {
          round.games.push({
            player1: players[i],
            player2: players[j],
            id: count,
            score1: 0,
            score2: 0,
          });
          count++;
        }
      }
    }
    return round;
  }

  getRounds() {
    return JSON.parse(
      localStorage.getItem(this.LOCAL_ROUNDS) || '[]'
    ) as Round[];
  }

  registerRound(newRound: Round) {
    const currentRounds = this.getRounds();
    newRound.games.forEach((game) => {
      this.scoreService.updateScore(game);
    });
    currentRounds.push(newRound);
    localStorage.setItem(this.LOCAL_ROUNDS, JSON.stringify(currentRounds));
  }
}
