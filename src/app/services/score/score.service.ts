import { Injectable } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { Player } from '../../interfaces/player.interface';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(private readonly playerService: PlayerService) {}

  updateScore(game: Game): void {
    const players = this.playerService.getPlayers();

    players.forEach((player) => {
      if (this.isPlayerInGame(player, game.player1)) {
        this.updatePlayerScore(player, game.score1, game.score2);
      } else if (this.isPlayerInGame(player, game.player2)) {
        this.updatePlayerScore(player, game.score2, game.score1);
      }
    });

    this.playerService.setPlayers(players);
  }

  private isPlayerInGame(player: Player, gamePlayer: Player): boolean {
    return player.id === gamePlayer.id;
  }

  private updatePlayerScore(player: Player, playerScore: number, opponentScore: number): void {
    player.score += playerScore;

    if (this.isWinner(playerScore)) {
      this.incrementWinCounters(player, opponentScore);
    }
  }

  private isWinner(score: number): boolean {
    return score === 2;
  }

  private incrementWinCounters(player: Player, opponentScore: number): void {
    player.winTimes += 1;
    if (opponentScore === 0) {
      player.win2x0Times += 1;
    } else {
      player.win2x1Times += 1;
    }
  }
}
