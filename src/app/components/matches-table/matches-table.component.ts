import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {

  matchesTab: any = [];
  constructor(
    private router: Router,
    private matchService: MatchService) { }

  ngOnInit() {
    this.matchService.getAllMatches().subscribe(
      (response) => {
        console.log("Here response from BE", response);
        this.matchesTab = response.matches;
      }
    )
  }

  deleteMatch(selectedId) {
    for (let i = 0; i < this.matchesTab.length; i++) {
      if (this.matchesTab[i].id == selectedId) {
        this.matchesTab.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("matches", JSON.stringify(this.matchesTab));
  }

  goToInfo(x) {
    localStorage.setItem("id", x);
    this.router.navigate(["matchInfo"]);
  }

  goToEdit(y) {
    this.router.navigate([`editMatch/${y}`]);
  }

}
