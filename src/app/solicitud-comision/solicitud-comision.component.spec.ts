import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudComisionComponent } from './solicitud-comision.component';

describe('SolicitudComisionComponent', () => {
  let component: SolicitudComisionComponent;
  let fixture: ComponentFixture<SolicitudComisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudComisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
