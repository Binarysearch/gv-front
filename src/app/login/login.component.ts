import { CoreService } from './../services/core.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TextService } from '../services/text.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = 'admin@galaxyvictor.com';
  password = '12345';
  errorMessage: string;

  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;

  constructor(public core: CoreService, public ts: TextService) { }

  ngOnInit() {
    this.emailInput.nativeElement.focus();
  }

  login() {
    this.core.login(this.email, this.password).subscribe(null, error => {
      if (error.status === 401) {
        this.errorMessage = this.ts.strings.invalidLoginCredentials;
        this.emailInput.nativeElement.focus();
        this.password = '';
      }
    });
  }

  passwordKeyEnterDown() {
    this.login();
  }
}
