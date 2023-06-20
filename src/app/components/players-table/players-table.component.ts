import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {

  players: any = [];
  constructor(
    private playerService: PlayerService,
    private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  goToEdit(id) {
    this.router.navigate([`editPlayer/${id}`]);
  }

  deletePlayer(id) {
    this.playerService.deletePlayerById(id).subscribe(
      (response) => {
        if (response.isDeleted) {
          this.getAll();
        }
      }
    )
  }

  getAll() {
    this.playerService.getAllPlayers().subscribe(
      (data) => {
        this.players = data.playersTab;
      }
    )
  }

}
