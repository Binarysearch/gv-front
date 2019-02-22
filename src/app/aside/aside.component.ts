import { Component, OnInit, Input } from '@angular/core';
import { TextService } from '../services/text.service';
import { AuthService } from '../services/auth.service';

export interface AsideOption {

  text: string;
  onclick?: () => any;
}

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  @Input() open = false;

  constructor(public ts: TextService, public authService: AuthService) { }

  ngOnInit() {
  }

}
