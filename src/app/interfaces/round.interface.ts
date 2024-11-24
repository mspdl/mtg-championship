import { Game } from './game.interface';

export interface Round {
  id: string;
  createdAt: string;
  games: Game[];
}
