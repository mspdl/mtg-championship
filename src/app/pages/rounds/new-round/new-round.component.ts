import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Round } from '../../../interfaces/round.interface';
import { RoundService } from '../../../services/round/round.service';

@Component({
  selector: 'app-new-round',
  templateUrl: './new-round.component.html',
  styleUrls: ['./new-round.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
  ],
})
export class NewRoundComponent implements OnInit {
  round: Round = <Round>{};

  constructor(
    private readonly roundService: RoundService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.round = this.roundService.createNewRound();
  }

  saveRound() {
    this.roundService.registerRound(this.round);
    this.router.navigate(['/rounds']);
  }

  isRoundValid(): boolean {
    return this.round.games.every(
      (game) => game.score1 === 2 || game.score2 === 2
    );
  }
}
