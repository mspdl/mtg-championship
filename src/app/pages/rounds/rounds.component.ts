import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Round } from '../../interfaces/round.interface';
import { RoundService } from '../../services/round/round.service';

@Component({
  selector: 'mtg-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
  ],
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
    this.router.navigate(['/round']);
  }

  editRound(roundId: number){
    this.router.navigate(['/round'], { state: { roundId } });
  }

  goToRanking() {
    this.router.navigate(['/ranking']);
  }
}
