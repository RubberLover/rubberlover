import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WamComponent } from './wam.component';

describe('WamComponent', () => {
  let component: WamComponent;
  let fixture: ComponentFixture<WamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
