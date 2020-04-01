import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsvezavacComponent } from './osvezavac.component';

describe('OsvezavacComponent', () => {
  let component: OsvezavacComponent;
  let fixture: ComponentFixture<OsvezavacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsvezavacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsvezavacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
