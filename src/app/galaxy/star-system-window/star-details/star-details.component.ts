import { TextService } from './../../../services/text.service';
import { CoreService } from './../../../services/core.service';
import { Component, Input } from '@angular/core';
import { STAR_TYPES, STAR_SIZES } from '../../galaxy-constants';
import { StarSystem } from 'src/app/game-objects/star-system';

@Component({
  selector: 'app-star-details',
  templateUrl: './star-details.component.html',
  styleUrls: ['./star-details.component.css']
})
export class StarDetailsComponent {

  @Input() starSystem: StarSystem;

  constructor(private core: CoreService, public ts: TextService) { }

  get starSystemType() {
    return STAR_TYPES[this.starSystem.type - 1];
  }

  get starSystemSize() {
    return STAR_SIZES[this.starSystem.size - 1];
  }

}
