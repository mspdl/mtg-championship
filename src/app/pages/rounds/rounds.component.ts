import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Round } from '../../interfaces/round.interface';
import { RoundService } from '../../services/round/round.service';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RoundsComponent implements OnInit {
  rounds: Round[] = [];

  constructor(
    private readonly roundService: RoundService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.rounds = this.roundService.getRounds();
  }

  createdRound() {
    this.router.navigate(['/create-round']);
  }
}
