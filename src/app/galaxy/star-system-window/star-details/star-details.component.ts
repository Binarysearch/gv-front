import { TextService } from './../../../services/text.service';
import { StarSystemDTO } from './../../../dtos/star-system';
import { CoreService } from './../../../services/core.service';
import { Component, Input } from '@angular/core';
import { STAR_TYPES, STAR_SIZES } from '../../galaxy-constants';

@Component({
  selector: 'app-star-details',
  templateUrl: './star-details.component.html',
  styleUrls: ['./star-details.component.css']
})
export class StarDetailsComponent {

  starSystem: StarSystemDTO;

  constructor(private core: CoreService, public ts: TextService) { }

  @Input() set starSystemId(id: number) {
    this.core.getStarSystem(id).subscribe(starSystem => {
      this.starSystem = starSystem;
    });
  }

  get starSystemType() {
    return STAR_TYPES[this.starSystem.type - 1];
  }

  get starSystemSize() {
    return STAR_SIZES[this.starSystem.size - 1];
  }


}
