import { CoreService } from './../services/core.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TextService } from '../services/text.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  repeatPassword: string;
  errorMessage: string;

  @ViewChild('emailInput') emailInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('repeatPasswordInput') repeatPasswordInput: ElementRef;

  constructor(private core: CoreService, public ts: TextService) { }

  ngOnInit() {
    this.emailInput.nativeElement.focus();
  }

  register() {
    if (this.password !== this.repeatPassword) {
      this.repeatPasswordInput.nativeElement.focus();
      return;
    }
    this.core.register(this.email, this.password).subscribe(null, error => {
      if (error.status === 400) {
        this.errorMessage = error.error.message;
        this.passwordInput.nativeElement.focus();
        this.password = '';
        this.repeatPassword = '';
      }
      if (error.status === 409) {
        this.errorMessage = error.error.message;
        this.emailInput.nativeElement.focus();
        this.password = '';
        this.repeatPassword = '';
      }

    });
  }

  passwordKeyEnterDown() {
    this.register();
  }

  passwordChange() {
    if (this.password !== this.repeatPassword) {
      this.errorMessage = this.ts.strings.passwordsDontMatch;
    } else {
      this.errorMessage = '';
    }
  }
}
