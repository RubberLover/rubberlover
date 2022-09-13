import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidthAsMeasuredFormComponent } from './width-as-measured-form.component';

describe('WidthAsMeasuredFormComponent', () => {
  let component: WidthAsMeasuredFormComponent;
  let fixture: ComponentFixture<WidthAsMeasuredFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidthAsMeasuredFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidthAsMeasuredFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
