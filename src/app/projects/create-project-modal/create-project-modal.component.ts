import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project';
import { ErrorService } from 'src/app/services/error.service';
import { TitleService } from 'src/app/services/title.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.css'],
})
export class CreateProjectModalComponent implements OnInit {
  @ViewChild('createProjectModal') createProjectModal: any;
  modalRef: NgbModalRef;
  project: Project;

  constructor(
    private modalService: NgbModal,
    private titleService: TitleService,
    private projectsService: ProjectsService,
    private errorService: ErrorService
  ) {
    this.project = { name: '', description: '' };
  }

  ngOnInit(): void {}

  createProject(event): void {
    event.preventDefault();
    this.projectsService
      .createProject(this.project)
      .subscribe((result: Project) => {
        this.project.id = result.id;
        this.modalRef.close(this.project);
      });
  }

  open(): Promise<any> {
    this.titleService.setPageTitle('Create Project Modal', '');
    this.modalRef = this.modalService.open(this.createProjectModal);
    return this.modalRef.result.then(
      (result) => {
        //On close event
        this.titleService.setPreviousPageTitle();
        this.errorService.error = null;
        return result;
      },
      (reason) => {
        //On Dismiss event
        this.titleService.setPreviousPageTitle();
        this.errorService.error = null;
      }
    );
  }
}
