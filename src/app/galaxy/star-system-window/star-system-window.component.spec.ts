import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarSystemWindowComponent } from './star-system-window.component';

describe('StarSystemWindowComponent', () => {
  let component: StarSystemWindowComponent;
  let fixture: ComponentFixture<StarSystemWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarSystemWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarSystemWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
