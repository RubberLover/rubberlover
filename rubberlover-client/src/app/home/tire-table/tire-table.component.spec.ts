import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TireTableComponent } from './tire-table.component';

describe('TireTableComponent', () => {
  let component: TireTableComponent;
  let fixture: ComponentFixture<TireTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TireTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TireTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
