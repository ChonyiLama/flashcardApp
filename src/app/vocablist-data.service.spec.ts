import { TestBed, inject } from '@angular/core/testing';

import { VocablistDataService } from './vocablist-data.service';

describe('VocablistDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VocablistDataService]
    });
  });

  it('should be created', inject([VocablistDataService], (service: VocablistDataService) => {
    expect(service).toBeTruthy();
  }));
});
