import { Player } from "./player.interface";

export interface Game {
  id: number;
  player: Player;
  opponent: Player;
  playerScore: number;
  opponentScore: number;
}
