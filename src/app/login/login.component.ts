import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService, Session } from '../services/auth.service';
import { TextService } from '../services/text.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errorMessage: string;

  @ViewChild("emailInput") emailInput: ElementRef;
  @ViewChild("passwordInput") passwordInput: ElementRef;

  constructor(private authService: AuthService, private ts: TextService) { }

  ngOnInit() {
    this.emailInput.nativeElement.focus();
  }

  login(){
    this.authService.login(this.email, this.password).subscribe(null, error => {
      if(error.status == 401){
        this.errorMessage = this.ts.strings.invalidLoginCredentials;
        this.emailInput.nativeElement.focus();
        this.password = "";
      }
    });
  }

  passwordKeyDown(event: KeyboardEvent){
    if(event.keyCode==13){
      this.login();
    }
  }
}
