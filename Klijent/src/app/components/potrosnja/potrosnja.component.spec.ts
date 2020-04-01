import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotrosnjaComponent } from './potrosnja.component';

describe('PotrosnjaComponent', () => {
  let component: PotrosnjaComponent;
  let fixture: ComponentFixture<PotrosnjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotrosnjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotrosnjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
