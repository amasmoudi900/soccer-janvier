import { MatchService } from './../../services/match.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-matches',
  templateUrl: './search-matches.component.html',
  styleUrls: ['./search-matches.component.css']
})
export class SearchMatchesComponent implements OnInit {

  searchForm: FormGroup;
  matches: any;
  constructor(
    private formBuilder: FormBuilder,
    private matchService: MatchService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      s1: ["", [Validators.required]],
      s2: ["", [Validators.required]],
    })
  }

  search() {
    this.matchService.search(this.searchForm.value).subscribe(
      (response) => {
        this.matches = response.findedMatches;
      }
    );
  }

}
