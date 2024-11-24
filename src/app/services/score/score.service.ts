import { Injectable } from '@angular/core';
import { PlayerScore } from '../../interfaces/player-score.interface';
import { Player } from '../../interfaces/player.interface';
import { Round } from '../../interfaces/round.interface';
import { PlayerService } from '../player/player.service';
import { RoundService } from '../round/round.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private _playersScore: Array<PlayerScore> = [];

  constructor(
    private readonly playerService: PlayerService,
    private readonly roundService: RoundService
  ) {}

  getPlayersScore(): Array<PlayerScore> {
    this.updateScore();
    return this._playersScore;
  }

  updateScore(): void {
    const rounds = this.roundService.getRounds();

    this._playersScore = [];
    this.playerService.getPlayers().subscribe({
      next: (players) => {
        players.forEach((player) => {
          this._playersScore.push({
            ...player,
            score: 0,
            wins: 0,
            wins2x0: 0,
            wins2x1: 0,
          });
        });
      },
    });

    rounds.forEach((round) => {
      round.games.forEach((game) => {
        this._playersScore.forEach((player) => {
          if (this.isPlayerInGame(player, game.player)) {
            this.updatePlayerScore(
              player,
              game.playerScore,
              game.opponentScore
            );
          } else if (this.isPlayerInGame(player, game.opponent)) {
            this.updatePlayerScore(
              player,
              game.opponentScore,
              game.playerScore
            );
          }
        });
      });
    });
  }

  private isPlayerInGame(player: Player, gamePlayer: Player): boolean {
    return player.id === gamePlayer.id;
  }

  private updatePlayerScore(
    player: PlayerScore,
    playerScore: number,
    opponentScore: number
  ): void {
    player.score += playerScore;

    if (this.isWinner(playerScore)) {
      this.incrementWinCounters(player, opponentScore);
    }
  }

  private isWinner(score: number): boolean {
    return score === 2;
  }

  private incrementWinCounters(
    player: PlayerScore,
    opponentScore: number
  ): void {
    player.wins += 1;
    if (opponentScore === 0) {
      player.wins2x0 += 1;
    } else {
      player.wins2x1 += 1;
    }
  }

  countDirectWins(playerA: Player, playerB: Player): number {
    let wins = 0;
    const rounds: Round[] = this.roundService.getRounds();

    rounds.forEach((round) => {
      round.games.forEach((game) => {
        if (
          (game.player.id === playerA.id &&
            game.opponent.id === playerB.id &&
            game.playerScore > game.opponentScore) ||
          (game.opponent.id === playerA.id &&
            game.player.id === playerB.id &&
            game.opponentScore > game.playerScore)
        ) {
          wins++;
        }
      });
    });

    return wins;
  }
}
