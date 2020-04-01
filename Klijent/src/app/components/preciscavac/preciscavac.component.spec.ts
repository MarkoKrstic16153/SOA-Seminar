import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreciscavacComponent } from './preciscavac.component';

describe('PreciscavacComponent', () => {
  let component: PreciscavacComponent;
  let fixture: ComponentFixture<PreciscavacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreciscavacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreciscavacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
