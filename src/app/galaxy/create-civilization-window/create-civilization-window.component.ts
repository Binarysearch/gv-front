import { CoreService } from './../../services/core.service';
import { TextService } from './../../services/text.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-create-civilization-window',
  templateUrl: './create-civilization-window.component.html',
  styleUrls: ['./create-civilization-window.component.css']
})
export class CreateCivilizationWindowComponent implements OnInit{

  civilizationName: string;
  homeStarName: string;
  errorMessage: string;

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('starNameInput') starNameInput: ElementRef;

  constructor(public ts: TextService, core: CoreService) { }

  ngOnInit(): void {
    this.nameInput.nativeElement.focus();
  }

  createCivilization() {

  }

}
