import { Component, OnInit } from '@angular/core';
import { AuthService, Session } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.email, this.password).subscribe((session: Session) => {
      if(session.token){
        localStorage.setItem("session", JSON.stringify(session));

        this.router.navigate([this.authService.redirectUrl]);
      }
    }, error => {
      if(error.status == 401){
        this.errorMessage = error.error.message;
      }
    });
  }

}
