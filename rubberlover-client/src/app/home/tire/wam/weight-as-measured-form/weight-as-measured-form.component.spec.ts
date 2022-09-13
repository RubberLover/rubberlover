import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightAsMeasuredFormComponent } from './weight-as-measured-form.component';

describe('WeightAsMeasuredFormComponent', () => {
  let component: WeightAsMeasuredFormComponent;
  let fixture: ComponentFixture<WeightAsMeasuredFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightAsMeasuredFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightAsMeasuredFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
