import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Player } from '../../interfaces/player.interface';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'app-create-players',
  templateUrl: './create-players.component.html',
  styleUrls: ['./create-players.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
})
export class CreatePlayersComponent implements OnInit {
  players: Player[] = [];

  playerFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  constructor(
    private readonly playerService: PlayerService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
  }

  addPlayer() {
    this.playerService.addNewPlayer('' + this.playerFormControl.value);
    this.players = this.playerService.getPlayers();
    this.resetPlayerNameField();
  }

  resetPlayerNameField() {
    this.playerFormControl.reset();
    this.playerFormControl.setErrors(null);
  }

  goToRanking() {
    this.router.navigate(['/ranking']);
  }
}
