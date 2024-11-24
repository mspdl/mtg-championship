import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { Round } from '../../interfaces/round.interface';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root',
})
export class RoundService {
  private readonly LOCAL_ROUNDS = 'rounds';

  constructor(
    private readonly playerService: PlayerService,
    private firestore: Firestore
  ) {}

  getRoundsApi(): Observable<Round[]> {
    const roundsRef = collection(this.firestore, 'rounds');
    const roundsQuery = query(roundsRef, orderBy('createdAt', 'asc'));

    return collectionData(roundsQuery, { idField: 'id' }) as Observable<
      Round[]
    >;
  }

  createNewRound(): Observable<Round> {
    const uniqueId = Date.now().toString();

    return this.playerService.getPlayers().pipe(
      map((players) => {
        const round: Round = { id: '', createdAt: uniqueId, games: [] };
        let count = 1;

        for (let i = 0; i < players.length; i++) {
          for (let j = 0; j < players.length; j++) {
            if (i < j) {
              round.games.push({
                player: players[i],
                opponent: players[j],
                id: count,
                playerScore: 0,
                opponentScore: 0,
              });
              count++;
            }
          }
        }

        return round;
      })
    );
  }

  getRounds() {
    return JSON.parse(
      localStorage.getItem(this.LOCAL_ROUNDS) || '[]'
    ) as Round[];
  }

  addRound(newRound: Round): Observable<void> {
    const playersRef = collection(this.firestore, 'rounds');
    return from(addDoc(playersRef, newRound).then(() => {}));
  }

  getRoundById(roundId: string): Observable<Round> {
    const roundDocRef = doc(this.firestore, `rounds/${roundId}`);
    return docData(roundDocRef, { idField: 'id' }) as Observable<Round>;
  }

  updateRound(round: Partial<Round>): Observable<void> {
    const roundDocRef = doc(this.firestore, `rounds/${round.id}`);
    return from(updateDoc(roundDocRef, round));
  }
}
