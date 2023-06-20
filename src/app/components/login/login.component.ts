import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required]],
    })
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log("Here response after login", response);
        if (response.msg == "2") {
          this.router.navigate([`profile/${response.user.email}`]);
        } else {
          this.errorMsg = "Please Check Email/Pwd";
        }
      }
    )
  }

}
