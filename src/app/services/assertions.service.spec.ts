import { TestBed } from '@angular/core/testing';

import { AssertionsService } from './assertions.service';

describe('AssertionsService', () => {
  let service: AssertionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssertionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
