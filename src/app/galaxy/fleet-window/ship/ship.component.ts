import { TextService } from './../../../services/text.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ship } from 'src/app/game-objects/ship';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.css']
})
export class ShipComponent implements OnInit {

  @Input() ship: Ship;
  @Output() select = new EventEmitter();
  @Output() deselect = new EventEmitter();

  @Input() selected: boolean;

  constructor(public ts: TextService) { }

  ngOnInit() {
  }

  onClick() {
    this.selected = !this.selected;
    if (this.selected) {
      this.select.emit();
    } else {
      this.deselect.emit();
    }
  }
}
