import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {

  findedMatch: any;
  constructor(private matchService: MatchService) { }

  ngOnInit() {
    let id = localStorage.getItem("id");
    this.matchService.getMatchById(id).subscribe(
      (response) => {
        this.findedMatch = response.match;
      }
    );
  }

}
