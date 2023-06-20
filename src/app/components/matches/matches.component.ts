import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matches: any = [
    { scoreOne: 1, scoreTwo: 3, teamOne: "CA", teamTwo: "EST" },
    { scoreOne: 0, scoreTwo: 2, teamOne: "JUV", teamTwo: "ROM" },
    { scoreOne: 4, scoreTwo: 0, teamOne: "INT", teamTwo: "SEV" },
    { scoreOne: 2, scoreTwo: 2, teamOne: "INT", teamTwo: "SEV" },
  ];
  constructor() { }

  ngOnInit() {
  }

}
