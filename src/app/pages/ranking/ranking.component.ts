import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Player } from '../../interfaces/player.interface';
import { ColumnHeaderPipe } from '../../pipes/column-header.pipe';
import { RankingService } from '../../services/ranking/ranking.service';

@Component({
  selector: 'mtg-ranking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ColumnHeaderPipe,
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
})
export class RankingComponent implements OnInit {
  players: Array<Player> = [];
  columnsToDisplay: string[] = ['position', 'name', 'score'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Player | undefined;

  constructor(
    private readonly rankingService: RankingService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.rankingService.getPlayersByRanking().subscribe({
        next: (players) => {
          this.players = players.map((player, index) => ({
            ...player,
            position: index + 1,
          }));
        },
      });
    }, 500);
  }

  goToPlayers() {
    this.router.navigate(['/players']);
  }

  goToRounds() {
    this.router.navigate(['/rounds']);
  }
}
