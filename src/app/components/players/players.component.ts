import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  playersTab: any = [
    { name: "Messi", position: "ATK", nbr: 10, img: "" },
    { name: "CR7", position: "MID", nbr: 7, img: "" }
  ]
  constructor() { }

  ngOnInit() {
  }

}
