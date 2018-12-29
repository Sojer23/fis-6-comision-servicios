import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionesInvestigadorComponent } from './comisiones-investigador.component';

describe('ComisionesInvestigadorComponent', () => {
  let component: ComisionesInvestigadorComponent;
  let fixture: ComponentFixture<ComisionesInvestigadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComisionesInvestigadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionesInvestigadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
