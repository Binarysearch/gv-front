import { TextService } from './../../../services/text.service';
import { Component, OnInit, Input } from '@angular/core';
import { Colony } from 'src/app/game-objects/colony';

@Component({
  selector: 'app-colony-details',
  templateUrl: './colony-details.component.html',
  styleUrls: ['./colony-details.component.css']
})
export class ColonyDetailsComponent implements OnInit {

  @Input() colony: Colony;

  constructor(public ts: TextService) { }

  ngOnInit() {
  }

}
