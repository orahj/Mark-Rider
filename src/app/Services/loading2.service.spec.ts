import { TestBed } from '@angular/core/testing';

import { Loading2Service } from './loading2.service';

describe('Loading2Service', () => {
  let service: Loading2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Loading2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
