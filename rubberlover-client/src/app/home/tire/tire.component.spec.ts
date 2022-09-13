import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TireComponent } from './tire.component';

describe('TireComponent', () => {
  let component: TireComponent;
  let fixture: ComponentFixture<TireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
