import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlimaComponent } from './klima.component';

describe('KlimaComponent', () => {
  let component: KlimaComponent;
  let fixture: ComponentFixture<KlimaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KlimaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KlimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
