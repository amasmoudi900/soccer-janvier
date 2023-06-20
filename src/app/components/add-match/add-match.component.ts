import { Router } from '@angular/router';
import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {

  // Form ID
  matchForm: FormGroup;
  // Match Object
  match: any = {};
  constructor(private matchService: MatchService) { }

  ngOnInit() {
  }
  addMatch() {
    console.log("Here match object", this.match);
    this.matchService.addMatch(this.match).subscribe(
      (response) => {
        console.log("Here response from BE", response);
      }
    );
  }

}
