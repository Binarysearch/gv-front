import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MAINComponent } from './main.component';

describe('MAINComponent', () => {
  let component: MAINComponent;
  let fixture: ComponentFixture<MAINComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MAINComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MAINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
