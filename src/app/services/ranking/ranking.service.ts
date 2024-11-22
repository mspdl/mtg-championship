import { Injectable } from '@angular/core';
import { Player } from '../../interfaces/player.interface';
import { ScoreService } from '../score/score.service';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor(private readonly scoreService: ScoreService) {}

  refreshRanking(): void {
    this.scoreService.updateScore();
  }

  getPlayersByRanking(): Player[] {
    return this.scoreService.getPlayersScore().sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      if (b.wins2x0 !== a.wins2x0) {
        return b.wins2x0 - a.wins2x0;
      }

      const headToHeadWinsA = this.scoreService.countDirectWins(a, b);
      const headToHeadWinsB = this.scoreService.countDirectWins(b, a);

      if (headToHeadWinsA !== headToHeadWinsB) {
        return headToHeadWinsB - headToHeadWinsA;
      }

      return 0;
    });
  }
}
