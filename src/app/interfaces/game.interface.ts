import { Player } from './player.interface';

export interface Game {
  id: number;
  player1: Player;
  player2: Player;
  score1: number;
  score2: number;
}
