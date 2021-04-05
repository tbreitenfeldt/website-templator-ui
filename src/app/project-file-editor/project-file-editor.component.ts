import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { CreateEditFileModalComponent } from '../modals/create-edit-file-modal/create-edit-file-modal.component';
import { ProjectFile } from '../models/project-file';
import { ErrorService } from '../services/error.service';
import { ProjectFilesService } from '../services/project-files.service';
import { TitleService } from '../services/title.service';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../models/project';
import { AlertModalComponent } from '../modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-project-file-editor',
  templateUrl: './project-file-editor.component.html',
  styleUrls: ['./project-file-editor.component.css'],
})
export class ProjectFileEditorComponent implements OnInit {
  isLoading: boolean;
  isSaved: boolean = true;
  saveMessage: string;
  project: Project;
  projectFile: ProjectFile = {
    filename: '',
    pageTitle: '',
    content: '',
    createdOn: null,
    updatedOn: null,
    published: false,
    projectId: -1,
  };
  projectFiles: ProjectFile[];
  publishedUrl: string;
  projectId: number;
  fileId: number;
  public editor = ClassicEditor;

  constructor(
    private projectsService: ProjectsService,
    private projectFilesService: ProjectFilesService,
    private titleService: TitleService,
    public errorService: ErrorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject('apiUrl') private apiUrl: string
  ) {}

  ngOnInit(): void {
    const projectIdStr: string = this.activatedRoute.snapshot.paramMap.get(
      'projectId'
    );
    const projectId = parseInt(projectIdStr, 10);
    const fileIdStr = this.activatedRoute.snapshot.paramMap.get('fileId');
    const fileId = parseInt(fileIdStr, 10);
    this.projectId = projectId;
    this.fileId = fileId;

    this.getProject().subscribe(() => {
      this.getProjectFile().subscribe(() => {
        this.titleService.setPageTitle(this.projectFile.filename);
        this.publishedUrl = `${this.apiUrl}/projects/${this.project.name}/${this.projectFile.filename}`;
      });

      this.getAllProjectFiles();
    });
  }

  onEditorChange(event): void {
    this.isSaved = false;
  }

  getProject(): Observable<Project> {
    this.isLoading = true;
    const getProjectObservable$ = this.projectsService.getProject(
      this.projectId
    );

    getProjectObservable$.subscribe((result: Project) => {
      this.project = result;
      this.isLoading = false;
    });
    return getProjectObservable$;
  }

  getProjectFile(): Observable<ProjectFile> {
    this.isLoading = true;
    const getFileObservable$ = this.projectFilesService.getProjectFile(
      this.projectId
    );

    getFileObservable$.subscribe((result: ProjectFile) => {
      this.projectFile = result;
      this.isLoading = false;
    });
    return getFileObservable$;
  }

  getAllProjectFiles(): Observable<ProjectFile[]> {
    this.isLoading = true;
    const getAllProjectFilesObservable$ = this.projectFilesService.getProjectFiles(
      this.projectId
    );

    getAllProjectFilesObservable$.subscribe((result: ProjectFile[]) => {
      this.projectFiles = result;
      this.isLoading = false;
    });
    return getAllProjectFilesObservable$;
  }

  saveProjectFile(): Observable<ProjectFile> {
    this.saveMessage = 'Saving...';
    this.isSaved = true;
    const updateFileObservable$ = this.projectFilesService.updateProjectFile(
      this.projectFile
    );

    updateFileObservable$.subscribe((result: ProjectFile) => {
      this.projectFile = result;
      this.saveMessage = 'Saved';
      setTimeout(() => (this.saveMessage = ''), 2000);
    });
    return updateFileObservable$;
  }

  publishProjectFile(alertModal: AlertModalComponent): Observable<ProjectFile> {
    if (!this.isSaved) {
      alertModal.open();
    } else {
      this.isLoading = true;
      const publishFileObservable$ = this.projectFilesService.publishProjectFile(
        this.fileId
      );

      publishFileObservable$.subscribe(() => {
        this.isLoading = false;
        this.projectFile.published = true;
        window.open(this.publishedUrl);
      });
      return publishFileObservable$;
    }
  }

  unpublishProjectFile(): Observable<ProjectFile> {
    this.isLoading = true;
    const unpublishFileObservable$ = this.projectFilesService.unpublishProjectFile(
      this.fileId
    );

    unpublishFileObservable$.subscribe(() => {
      this.isLoading = false;
      this.projectFile.published = false;
    });
    return unpublishFileObservable$;
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
          this.router.navigate([`/projects/${this.projectId}`]);
        });
      }
    });
    return deleteProjectFileObservable$;
  }

  openCreateFileModal(createFileModal: CreateEditFileModalComponent): void {
    createFileModal.open().then((result: ProjectFile) => {
      if (result) {
        this.router.navigate([
          `/projects/${this.projectId}/files/${result.id}`,
        ]);
      }
    });
  }

  openEditFileModal(
    editFileModal: CreateEditFileModalComponent,
    index: number
  ): void {
    editFileModal.open(this.projectFile).then((result: ProjectFile) => {
      if (result) {
        this.projectFile = result;
      }
    });
  }
}
