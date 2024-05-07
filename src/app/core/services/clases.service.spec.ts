import { TestBed } from '@angular/core/testing';

import { clasesService } from './clases.service';

describe('clasesService', () => {
  let service: clasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(clasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
