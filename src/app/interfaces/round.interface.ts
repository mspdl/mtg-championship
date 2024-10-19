import { Game } from './game.interface';

export interface Round {
  id: number;
  games: Game[];
}
