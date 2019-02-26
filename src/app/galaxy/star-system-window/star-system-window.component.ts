import { CoreService } from './../../services/core.service';
import { Component, OnInit, Input } from '@angular/core';
import { StarSystem } from '../../entities/star-system';

@Component({
  selector: 'app-star-system-window',
  templateUrl: './star-system-window.component.html',
  styleUrls: ['./star-system-window.component.css']
})
export class StarSystemWindowComponent implements OnInit {

  @Input() starSystem: StarSystem;

  constructor(private core: CoreService) { }

  ngOnInit() {
  }
}
