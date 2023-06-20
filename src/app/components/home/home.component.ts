import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  matchObj: any = {scoreOne: 0, scoreTwo: 2, teamOne: "EST", teamTwo: "CA"};
  constructor() { }

  ngOnInit() {
  }

}
