import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlayerScore } from '../../interfaces/player-score.interface';
import { Player } from '../../interfaces/player.interface';
import { Round } from '../../interfaces/round.interface';
import { PlayerService } from '../player/player.service';
import { RoundService } from '../round/round.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private _playersSubject = new BehaviorSubject<Player[]>([]);
  private _roundsSubject = new BehaviorSubject<Round[]>([]);

  constructor(
    private readonly playerService: PlayerService,
    private readonly roundService: RoundService
  ) {
    this.playerService.getPlayers().subscribe({
      next: (players) => {
        console.log('players', players);
        this._playersSubject.next(players);
      },
    });
    this.roundService.getRounds().subscribe({
      next: (rounds) => {
        this._roundsSubject.next(rounds);
      },
    });
  }

  getPlayers(): Observable<Player[]> {
    return this._playersSubject.asObservable();
  }

  getRounds(): Observable<Round[]> {
    return this._roundsSubject.asObservable();
  }

  getPlayersScore(): Observable<PlayerScore[]> {
    return new Observable<PlayerScore[]>((observer) => {
      this._playersSubject.subscribe((players) => {
        if (players.length === 0) return;

        this._roundsSubject.subscribe((rounds) => {
          const playerScores: PlayerScore[] = players.map((player) => ({
            ...player,
            score: 0,
            wins: 0,
            wins2x0: 0,
            wins2x1: 0,
          }));

          rounds.forEach((round) => {
            round.games.forEach((game) => {
              playerScores.forEach((player) => {
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

          observer.next(playerScores);
          observer.complete();
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

    this._roundsSubject.value.forEach((round) => {
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
