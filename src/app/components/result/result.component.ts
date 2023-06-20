import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() matchInput: any;
  constructor() { }

  ngOnInit() {
  }

  scoreColor(s1, s2) {
    if (s1 > s2) {
      return ["green", "Win"];
    } else if (s1 < s2) {
      return ["orange", "Loss"];
    } else {
      return ["blue", "Draw"];
    }
  }


}
