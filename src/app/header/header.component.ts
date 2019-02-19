import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TextService } from '../services/text.service';

export interface NavButton{
  text:string,
  icon:string,
  link:string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor(private authService: AuthService, private ts: TextService) { }

  ngOnInit() {
  }

}
