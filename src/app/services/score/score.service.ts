import { Injectable } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(private readonly playerService: PlayerService) {}

  updateScore(game: Game) {
    if (game.score1 == 2) {
      game.player1.score += 2;
    }
    if (game.score1 == 1) {
      game.player1.score += 1;
    }
    if (game.score2 == 2) {
      game.player2.score += 2;
    }
    if (game.score2 == 1) {
      game.player2.score += 1;
    }

    const players = this.playerService.getPlayers()
    players.forEach((player) => {
      if(player.id === game.player1.id){
        player.score +=game.player1.score;
      }
      if(player.id === game.player2.id){
        player.score +=game.player2.score;
      }
    })

    this.playerService.setPlayers(players)
  }
}
