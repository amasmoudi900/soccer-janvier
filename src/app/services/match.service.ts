import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  // Server Destination Address
  matchURL: string = "http://localhost:3000/api/matches";
  constructor(private httpClient: HttpClient) { }

  // Response : Array of objects
  getAllMatches() {
    return this.httpClient.get<{ matches: any, message: string }>(this.matchURL);
  }

  // x : Match ID (6, 9, 2 ...)
  // Response: One Object
  getMatchById(x) {
    return this.httpClient.get<{ match: any }>(`${this.matchURL}/${x}`);
    // return this.httpClient.get(`${this.matchURL}/${x}`);
    // return this.httpClient.get(this.matchURL + "/" + x);
  }

  // y : Match ID (6, 9, 2 ...)
  // Response: Boolean
  deleteMatch(x) {
    return this.httpClient.delete(`${this.matchURL}/${x}`);
  }

  // matchObj: { scoreOne: 1, scoreTwo: 3 .....}
  // Response: Boolean
  addMatch(matchObj) {
    return this.httpClient.post<{ message: string }>(this.matchURL, matchObj);
  }

  // Response: Boolean
  // newMatch : object with new values
  editMatch(newMatch) {
    return this.httpClient.put(this.matchURL, newMatch);
  }

  // obj = {s1: 3, s2: 1}
  search(obj) {
    // return this.httpClient.post(`${this.matchURL}/searchMatches`, obj)
    return this.httpClient.post<{ findedMatches: any, msg: string }>(this.matchURL + "/searchMatches", obj);
  }
}
