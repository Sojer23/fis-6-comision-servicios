import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionesAdminComponent } from './comisiones-admin.component';

describe('ComisionesAdminComponent', () => {
  let component: ComisionesAdminComponent;
  let fixture: ComponentFixture<ComisionesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComisionesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
