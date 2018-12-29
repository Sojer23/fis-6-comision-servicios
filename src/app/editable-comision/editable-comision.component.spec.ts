import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableComisionComponent } from './editable-comision.component';

describe('EditableComisionComponent', () => {
  let component: EditableComisionComponent;
  let fixture: ComponentFixture<EditableComisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableComisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
