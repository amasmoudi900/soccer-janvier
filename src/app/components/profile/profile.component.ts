import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  userEmail: string;
  userProfile: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: [""],
      lastName: [""],
      email: [""],
      pwd: [""],
    })
    this.userEmail = this.activatedRoute.snapshot.paramMap.get("email");
    this.userService.getUserByEmail(this.userEmail).subscribe(
      (response) => {
        console.log("Here response from BE", response.user);
        this.userProfile = response.user;
      }
    )
  }

  edit() {
    this.userService.editUser(this.userProfile).subscribe(
      (response) => {
        console.log("Here response after upddate from BE", response.msg);
      }
    )
  }
}
