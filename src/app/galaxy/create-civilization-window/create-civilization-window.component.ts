import { CoreService } from './../../services/core.service';
import { TextService } from './../../services/text.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-create-civilization-window',
  templateUrl: './create-civilization-window.component.html',
  styleUrls: ['./create-civilization-window.component.css']
})
export class CreateCivilizationWindowComponent implements OnInit {

  civilizationName: string;
  homeStarName: string;
  errorMessage: string;

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('starNameInput') starNameInput: ElementRef;

  constructor(public ts: TextService, private core: CoreService) { }

  ngOnInit(): void {
    this.nameInput.nativeElement.focus();
  }

  createCivilization() {
    if (!this.civilizationName ||
        this.civilizationName.trim().length < 3 ||
        this.civilizationName.trim().length !== this.civilizationName.length
        ) {

      this.errorMessage = this.ts.strings.invalidCivilizationName;
      this.nameInput.nativeElement.focus();
      return;
    }
    if (!this.homeStarName || this.homeStarName.trim().length < 3 || this.homeStarName.trim().length !== this.homeStarName.length) {
      this.errorMessage = this.ts.strings.invalidHomeStarName;
      this.starNameInput.nativeElement.focus();
      return;
    }

    this.core.createCivilization(this.civilizationName, this.homeStarName).subscribe(null, error => {
      if (error.status === 409) {
        this.errorMessage = this.ts.strings.civilizationNameExists;
        this.nameInput.nativeElement.focus();
      }
    });
  }

}
