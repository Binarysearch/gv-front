import { Component, OnInit } from '@angular/core';
import { GalaxiesService, Galaxy } from '../services/galaxies.service';
import { TextService } from '../services/text.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galaxies',
  templateUrl: './galaxies.component.html',
  styleUrls: ['./galaxies.component.css']
})
export class GalaxiesComponent implements OnInit {
  galaxies: Galaxy[];

  constructor(public galaxiesService: GalaxiesService, public ts: TextService, private router: Router) { }

  ngOnInit() {
    this.galaxiesService.getGalaxies().subscribe((galaxies: Galaxy[]) => {
      this.galaxies = galaxies;
    });
  }

  selectGalaxy(id: number){
    this.galaxiesService.selectGalaxy(id).subscribe((galaxy: Galaxy) => {
      this.router.navigate(["/galaxy"]);
    });
  }
}
