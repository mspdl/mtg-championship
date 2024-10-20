import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Round } from '../../interfaces/round.interface';
import { RoundService } from '../../services/round/round.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatButton, MatExpansionModule],
})
export class RoundsComponent implements OnInit {
  rounds: Round[] = [];
  readonly panelOpenState = signal(false);


  constructor(
    private readonly roundService: RoundService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.rounds = this.roundService.getRounds();
  }

  addRound() {
    this.router.navigate(['/create-round']);
  }

  goToRanking() {
    this.router.navigate(['/ranking']);
  }
}
