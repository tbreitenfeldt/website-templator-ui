import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ErrorService } from 'src/app/services/error.service';
import { TitleService } from 'src/app/services/title.service';
import { ProjectsService } from '../../services/projects.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-create-edit-project-modal',
  templateUrl: './create-edit-project-modal.component.html',
  styleUrls: ['./create-edit-project-modal.component.css'],
})
export class CreateEditProjectModalComponent implements OnInit {
  project: Project = { name: '', description: '' };
  modalTitle: string;
  @ViewChild('modalRef') modalRef: ModalComponent;
  @Input() mode?: 'create' | 'edit' = 'create';

  constructor(
    private titleService: TitleService,
    private projectsService: ProjectsService,
    public errorService: ErrorService
  ) {
    if (this.mode === 'create') {
      this.modalTitle = 'Create Project Modal';
    } else if (this.mode === 'edit') {
      this.modalTitle = 'Edit Project Modal';
    }
  }

  ngOnInit(): void {}

  open(projectToUpdate: Project = null): Promise<any> {
    if (this.mode === 'edit' && projectToUpdate) {
      this.project = projectToUpdate;
    } else if (this.mode === 'edit' && !projectToUpdate) {
      throw Error('Please provide a valid Project object when editing.');
    }

    return this.modalRef.open();
  }

  onSubmit(event: Event): void {
    if (this.mode === 'create') {
      this.createProject();
    } else if (this.mode === 'edit') {
      this.updateProject();
    }
  }

  createProject(): Observable<Project> {
    const createProjectObservable$ = this.projectsService.createProject(
      this.project
    );

    createProjectObservable$.subscribe((result: Project) => {
      this.project.id = result.id;
      this.modalRef.close(this.project);
    });
    return createProjectObservable$;
  }

  updateProject(): Observable<Project> {
    const updateProjectObservable$ = this.projectsService.updateProject(
      this.project
    );

    updateProjectObservable$.subscribe(() => {
      this.modalRef.close(this.project);
    });
    return updateProjectObservable$;
  }
}
