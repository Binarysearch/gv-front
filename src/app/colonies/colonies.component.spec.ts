import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoniesComponent } from './colonies.component';

describe('ColoniesComponent', () => {
  let component: ColoniesComponent;
  let fixture: ComponentFixture<ColoniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColoniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
