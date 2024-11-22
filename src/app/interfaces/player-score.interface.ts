import { Player } from "./player.interface";

export interface PlayerScore extends Player {
  score: number;
  wins: number;
  wins2x0: number;
  wins2x1: number;
}
