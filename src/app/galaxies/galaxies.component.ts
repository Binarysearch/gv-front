import { Component, OnInit } from '@angular/core';
import { TextService } from '../services/text.service';
import { Router } from '@angular/router';
import { CoreService } from '../services/core.service';
import { GalaxyDTO } from '../dtos/galaxy';

@Component({
  selector: 'app-galaxies',
  templateUrl: './galaxies.component.html',
  styleUrls: ['./galaxies.component.css']
})
export class GalaxiesComponent implements OnInit {
  galaxies: GalaxyDTO[];

  constructor(public coreService: CoreService, public ts: TextService, private router: Router) { }

  ngOnInit() {
    this.coreService.getGalaxies().subscribe((galaxies: GalaxyDTO[]) => {
      this.galaxies = galaxies;
    });
  }

  selectGalaxy(id: number) {
    this.coreService.selectGalaxy(id).subscribe((galaxy: GalaxyDTO) => {
      this.router.navigate(['/galaxy']);
    });
  }
}
