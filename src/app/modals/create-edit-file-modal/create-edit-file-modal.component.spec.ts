import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditFileModalComponent } from './create-edit-file-modal.component';

describe('CreateEditFileModalComponent', () => {
  let component: CreateEditFileModalComponent;
  let fixture: ComponentFixture<CreateEditFileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditFileModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
