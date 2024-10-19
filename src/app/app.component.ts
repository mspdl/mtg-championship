import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CreatePlayersComponent } from './components/create-players/create-players.component';
import { PlayerService } from './services/player/player.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CreatePlayersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly playerService: PlayerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const players = this.playerService.getPlayers();
    if (!players || players.length < 2) {
      this.router.navigate(['/players']);
    }
  }
}
