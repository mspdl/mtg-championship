import { Injectable } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(private readonly playerService: PlayerService) {}

  updateScore(game: Game) {
    const players = this.playerService.getPlayers();

    players.forEach((player) => {
      if (player.id == game.player1.id) {
        player.score += game.score1;

        if (game.score1 == 2) {
          player.winTimes += 1;
          if (game.score2 == 0) {
            player.win2x0Times += 1;
          } else {
            player.win2x1Times += 1;
          }
        }
      }
      if (player.id == game.player2.id) {
        player.score += game.score2;

        if (game.score2 == 2) {
          player.winTimes += 1;
          if (game.score1 == 0) {
            player.win2x0Times += 1;
          } else {
            player.win2x1Times += 1;
          }
        }
      }
    });

    this.playerService.setPlayers(players);
  }
}
