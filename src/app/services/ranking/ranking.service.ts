import { Injectable } from '@angular/core';
import { Player } from '../../interfaces/player.interface';
import { Round } from '../../interfaces/round.interface';
import { PlayerService } from '../player/player.service';
import { RoundService } from '../round/round.service';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor(
    private readonly playerService: PlayerService,
    private readonly roundService: RoundService
  ) {}

  getPlayersByRanking(): Player[] {
    const players = this.playerService.getPlayers();
    const rounds = this.roundService.getRounds();
    return players.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      if (b.win2x0Times !== a.win2x0Times) {
        return b.win2x0Times - a.win2x0Times;
      }

      const headToHeadWinsA = this.countDirectWins(a, b, rounds);
      const headToHeadWinsB = this.countDirectWins(b, a, rounds);

      if (headToHeadWinsA !== headToHeadWinsB) {
        return headToHeadWinsB - headToHeadWinsA;
      }

      return 0;
    });
  }

  countDirectWins(playerA: Player, playerB: Player, rounds: Round[]): number {
    let wins = 0;

    rounds.forEach((round) => {
      round.games.forEach((game) => {
        if (
          (game.player1.id === playerA.id &&
            game.player2.id === playerB.id &&
            game.score1 > game.score2) ||
          (game.player2.id === playerA.id &&
            game.player1.id === playerB.id &&
            game.score2 > game.score1)
        ) {
          wins++;
        }
      });
    });

    return wins;
  }
}
