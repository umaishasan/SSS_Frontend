import { TestBed } from '@angular/core/testing';

import { ToastedService } from './toasted.service';

describe('ToastedService', () => {
  let service: ToastedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
