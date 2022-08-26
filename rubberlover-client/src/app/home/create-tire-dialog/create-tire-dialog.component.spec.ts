import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTireDialogComponent } from './create-tire-dialog.component';

describe('CreateTireDialogComponent', () => {
  let component: CreateTireDialogComponent;
  let fixture: ComponentFixture<CreateTireDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTireDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
