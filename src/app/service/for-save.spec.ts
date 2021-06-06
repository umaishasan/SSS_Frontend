import { TestBed } from '@angular/core/testing';
import { ForSaveService } from './for-save';


describe('ForSaveService', () => {
  let service: ForSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
