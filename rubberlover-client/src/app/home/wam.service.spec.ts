import { TestBed } from '@angular/core/testing';

import { WamService } from './wam.service';

describe('WamService', () => {
  let service: WamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
