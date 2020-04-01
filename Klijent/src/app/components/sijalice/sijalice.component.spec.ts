import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SijaliceComponent } from './sijalice.component';

describe('SijaliceComponent', () => {
  let component: SijaliceComponent;
  let fixture: ComponentFixture<SijaliceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SijaliceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SijaliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
