import { Component, OnInit, Input } from '@angular/core';

export interface AsideOption{
  text: string,
  onclick?: () => any
}

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  @Input("open") open = false;

  @Input("options") options: AsideOption[];

  constructor() { }

  ngOnInit() {
  }

}
