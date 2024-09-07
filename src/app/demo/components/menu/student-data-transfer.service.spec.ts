import { TestBed } from '@angular/core/testing';

import { StudentDataTransferService } from './student-data-transfer.service';

describe('StudentDataTransferService', () => {
  let service: StudentDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
