import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'mtg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
})
export class HeaderComponent {
  constructor(private readonly router: Router) {}

  goToRanking() {
    this.router.navigate(['/ranking']);
  }
  goToPlayers() {
    this.router.navigate(['/players']);
  }
  goToRounds() {
    this.router.navigate(['/rounds']);
  }
}
