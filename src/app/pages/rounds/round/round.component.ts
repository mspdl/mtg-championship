import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Round } from '../../../interfaces/round.interface';
import { RoundService } from '../../../services/round/round.service';
import { RankingService } from './../../../services/ranking/ranking.service';

@Component({
  selector: 'mtg-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
  ],
})
export class RoundComponent implements OnInit {
  round!: Round;
  roundId!: number;
  editMode = false;

  constructor(
    private readonly roundService: RoundService,
    private readonly rankingService: RankingService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.roundId = history.state.roundId;

    if (this.roundId) {
      this.round = this.roundService.getRoundById(this.roundId);
      this.editMode = true;
    } else {
      this.round = this.roundService.createNewRound();
    }
  }

  saveRound() {
    this.editMode
      ? this.roundService.updateRound(this.round)
      : this.roundService.registerRound(this.round);
    this.rankingService.refreshRanking();
    this.goToRounds();
  }

  goToRounds() {
    this.router.navigate(['/rounds']);
  }

  isRoundValid(): boolean {
    return this.round.games.every(
      (game) => game.playerScore === 2 || game.opponentScore === 2
    );
  }
}
