import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { AdminComponent } from './components/admin/admin.component';
import { PlayersComponent } from './components/players/players.component';
import { MatchesComponent } from './components/matches/matches.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchMatchesComponent } from './components/search-matches/search-matches.component';
import { WeatherComponent } from './components/weather/weather.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  // http://localhost:4200/
  { path: "", component: HomeComponent },
  // http://localhost:4200/signin => LoginComponent will be displayed
  { path: "signin", component: LoginComponent },
  // http://localhost:4200/subscription => SignupComponent will be displayed
  { path: "subscription", component: SignupComponent },
  { path: "addMatch", component: AddMatchComponent },
  { path: "addTeam", component: AddTeamComponent },
  { path: "allMatches", component: MatchesComponent },
  { path: "players", component: PlayersComponent },
  { path: "admin", component: AdminComponent },
  { path: "matchInfo", component: MatchInfoComponent },
  { path: "editMatch/:x", component: EditMatchComponent },
  { path: "searchMatches", component: SearchMatchesComponent },
  { path: "weather", component: WeatherComponent },
  { path: "addPlayer", component: PlayerFormComponent },
  { path: "editPlayer/:id", component: PlayerFormComponent },
  { path: "profile/:email", component: ProfileComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
