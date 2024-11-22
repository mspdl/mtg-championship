import { Injectable } from '@angular/core';
import { Round } from '../../interfaces/round.interface';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  private readonly LOCAL_ROUNDS = 'rounds';

  constructor(private readonly playerService: PlayerService) {}

  createNewRound() {
    const players = this.playerService.getPlayers();
    const round: Round = { id: this.getRounds().length + 1, games: [] };
    let count = 1;
    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < players.length; j++) {
        if (i < j) {
          round.games.push({
            player: players[i],
            opponent: players[j],
            id: count,
            playerScore: 0,
            opponentScore: 0,
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

  getRoundById(roundId: number): Round {
    const round = this.getRounds().find((round) => round.id === roundId);

    if (!round) {
      throw new Error(`Round com id ${roundId} não encontrado`);
    }

    return round;
  }

  registerRound(newRound: Round) {
    // const rounds = this.getRounds();
    // rounds.push(newRound);
    this.setLocalRounds([...this.getRounds(), newRound]);
  }

  updateRound(updatedData: Round): void {
    const rounds = this.getRounds();

    const index = rounds.findIndex((round) => round.id === updatedData.id);
    if (index === -1) {
      throw new Error(`Round com id ${updatedData.id} não encontrado`);
    }

    rounds[index] = updatedData;

    this.setLocalRounds(rounds);
  }

  setLocalRounds(rounds: Array<Round>): void {
    localStorage.setItem(this.LOCAL_ROUNDS, JSON.stringify(rounds));
  }
}
