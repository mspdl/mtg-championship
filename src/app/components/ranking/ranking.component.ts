import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Player } from '../../interfaces/player.interface';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css',
})
export class RankingComponent implements OnInit {
  players: Array<Player> = [];
  columnsToDisplay: string[] = ['position', 'name', 'wins', 'score'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Player | null | undefined;

  constructor(
    private readonly playerService: PlayerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.players = this.playerService.getPlayersByRanking();
  }

  goToRounds() {
    this.router.navigate(['/rounds']);
  }
}
