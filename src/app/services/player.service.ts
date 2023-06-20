import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerUrl: string = "http://localhost:3000/api/players";
  constructor(private http: HttpClient) { }

  addPlayer(player) {
    return this.http.post<{ msg: string }>(this.playerUrl, player);
  }

  getAllPlayers() {
    return this.http.get<{ playersTab: any }>(this.playerUrl);
  }

  getPlayerById(id) {
    return this.http.get<{ player: any }>(`${this.playerUrl}/${id}`);
  }

  deletePlayerById(id) {
    return this.http.delete<{ isDeleted: boolean }>(`${this.playerUrl}/${id}`);
  }

  editPlayer(newPlayer) {
    return this.http.put<{ msg: string }>(this.playerUrl, newPlayer);
  }
}
