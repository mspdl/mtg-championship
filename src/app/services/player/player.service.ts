import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Player } from '../../interfaces/player.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private firestore: Firestore) {}

  getPlayers(): Observable<Player[]> {
    const playersRef = collection(this.firestore, 'players');
    return collectionData(playersRef, {
      idField: 'id',
    }) as Observable<Player[]>;
  }

  addPlayer(name: string): Observable<void> {
    const player: Player = {
      name,
    };
    const playersRef = collection(this.firestore, 'players');
    return from(addDoc(playersRef, player).then(() => {}));
  }

  updatePlayer(id: string, player: Partial<Player>): Observable<void> {
    const playerDocRef = doc(this.firestore, `players/${id}`);
    return from(updateDoc(playerDocRef, player));
  }

  deletePlayer(id: string): Observable<void> {
    const playerDocRef = doc(this.firestore, `players/${id}`);
    return from(deleteDoc(playerDocRef));
  }

}
