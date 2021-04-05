import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectFile } from 'src/app/models/project-file';
import { ErrorService } from 'src/app/services/error.service';
import { ProjectFilesService } from 'src/app/services/project-files.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-create-edit-file-modal',
  templateUrl: './create-edit-file-modal.component.html',
  styleUrls: ['./create-edit-file-modal.component.css'],
})
export class CreateEditFileModalComponent implements OnInit {
  projectFile: ProjectFile = {
    filename: '',
    pageTitle: '',
    content: '',
    createdOn: null,
    published: false,
    projectId: -1,
  };
  modalTitle: string;
  @ViewChild('modalRef') modalRef: ModalComponent;
  @Input() mode?: 'create' | 'edit' = 'create';

  constructor(
    private projectFilesService: ProjectFilesService,
    public errorService: ErrorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.mode === 'create') {
      this.modalTitle = 'Create File Modal';
    } else if (this.mode === 'edit') {
      this.modalTitle = 'Edit File Modal';
    }
  }

  open(fileToUpdate: ProjectFile = null): Promise<any> {
    if (this.mode === 'edit' && fileToUpdate) {
      this.projectFile = fileToUpdate;
    } else if (this.mode === 'edit' && !fileToUpdate) {
      throw Error('Please provide a valid Project object when editing.');
    }

    return this.modalRef.open();
  }

  onSubmit(event: Event): void {
    if (this.mode === 'create') {
      this.createProjectFile();
    } else if (this.mode === 'edit') {
      this.updateProjectFile();
    }
  }

  createProjectFile(): Observable<ProjectFile> {
    const tempId: string = this.activatedRoute.snapshot.paramMap.get('id');
    const projectId = parseInt(tempId, 10);
    this.projectFile.projectId = projectId;

    const createProjectFileObservable$ = this.projectFilesService.createProjectFile(
      this.projectFile
    );

    createProjectFileObservable$.subscribe((result: ProjectFile) => {
      this.projectFile = result;
      this.modalRef.close(this.projectFile);
    });
    return createProjectFileObservable$;
  }

  updateProjectFile(): Observable<ProjectFile> {
    const updateProjectFileObservable$ = this.projectFilesService.updateProjectFile(
      this.projectFile
    );

    updateProjectFileObservable$.subscribe((result: ProjectFile) => {
      this.modalRef.close(result);
    });
    return updateProjectFileObservable$;
  }
}
