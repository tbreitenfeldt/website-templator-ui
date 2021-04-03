import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { CreateEditFileModalComponent } from '../modals/create-edit-file-modal/create-edit-file-modal.component';
import { CreateEditProjectModalComponent } from '../modals/create-edit-project-modal/create-edit-project-modal.component';
import { Project } from '../models/project';
import { ProjectFile } from '../models/project-file';
import { ProjectFilesService } from '../services/project-files.service';
import { ProjectsService } from '../services/projects.service';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
})
export class ViewProjectComponent implements OnInit {
  isLoading: boolean;
  isModalActive: boolean = false;
  project: Project = { name: '', description: '' };
  projectId: number;
  projectFiles: ProjectFile[];
  selectedProjectFile: ProjectFile = {
    filename: '',
    pageTitle: '',
    content: '',
    createdOn: null,
    updatedOn: null,
    projectId: -1,
  };

  constructor(
    private titleService: TitleService,
    private projectService: ProjectsService,
    private projectFilesService: ProjectFilesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const tempId: string = this.activatedRoute.snapshot.paramMap.get('id');
    const projectId = parseInt(tempId, 10);
    this.projectId = projectId;

    this.getProject().subscribe(() => {
      this.titleService.setPageTitle(this.project.name);
      this.getProjectFiles();
    });
  }

  getProject(): Observable<Project> {
    this.isLoading = true;
    const projectObservable$ = this.projectService.getProject(this.projectId);

    projectObservable$.subscribe((project: Project) => {
      this.project = project;
      this.isLoading = false;
    });
    return projectObservable$;
  }

  getProjectFiles(): Observable<ProjectFile[]> {
    this.isLoading = true;
    const projectFilesObservable$ = this.projectFilesService.getProjectFiles(
      this.projectId
    );

    projectFilesObservable$.subscribe((projectFiles: ProjectFile[]) => {
      this.projectFiles = projectFiles;
      this.isLoading = false;
    });
    return projectFilesObservable$;
  }

  deleteProjectFile(
    modalRef: ConfirmationModalComponent,
    id: number
  ): Observable<ProjectFile> {
    const deleteProjectFileObservable$ = this.projectFilesService.deleteProject(
      id
    );

    modalRef.open().then((result) => {
      if (result) {
        deleteProjectFileObservable$.subscribe(() => {
          this.getProjectFiles();
        });
      }
    });

    return deleteProjectFileObservable$;
  }

  deleteProject(modalRef: ConfirmationModalComponent): Observable<Project> {
    const deleteProjectObservable$ = this.projectService.deleteProject(
      this.projectId
    );

    modalRef.open().then((result) => {
      if (result) {
        deleteProjectObservable$.subscribe(() => {
          this.router.navigate(['/projects']);
        });
      }
    });

    return deleteProjectObservable$;
  }

  openEditProjectModal(
    editProjectModal: CreateEditProjectModalComponent
  ): void {
    editProjectModal.open(this.project).then((result: Project) => {
      if (result) {
        this.project = result;
        this.titleService.setPageTitle(this.project.name);
      }
    });
  }

  openCreateFileModal(createFileModal: CreateEditFileModalComponent): void {
    createFileModal.open().then((result: ProjectFile) => {
      if (result) {
        this.projectFiles.push(result);
      }
    });
  }

  openEditFileModal(
    editFileModal: CreateEditFileModalComponent,
    index: number
  ): void {
    editFileModal.open(this.selectedProjectFile).then((result: ProjectFile) => {
      if (result) {
        const deleteCount = 1;
        this.projectFiles.splice(index, deleteCount, result);
      }
    });
  }
}
