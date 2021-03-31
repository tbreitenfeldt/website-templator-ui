import { TestBed } from '@angular/core/testing';

import { ProjectFilesService } from './project-files.service';

describe('ProjectFilesService', () => {
  let service: ProjectFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
