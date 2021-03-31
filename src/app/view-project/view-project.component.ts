import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  project: Project;
  projectId: number;
  projectFiles: ProjectFile[];
  isLoading: boolean;

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

    if (!projectId) {
      throw Error('Invalid project ID');
    }

    this.projectId = projectId;

    this.getProject().subscribe(() => {
      this.titleService.setPageTitle(`${this.project.name} Project`);
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

  deleteProjectFile(id: number): Observable<ProjectFile> {
    const deleteProjectFileObservable$ = this.projectFilesService.deleteProject(
      id
    );

    deleteProjectFileObservable$.subscribe(() => {
      this.getProjectFiles();
    });
    return deleteProjectFileObservable$;
  }

  deleteProject(): Observable<Project> {
    const deleteProjectObservable$ = this.projectService.deleteProject(
      this.projectId
    );

    deleteProjectObservable$.subscribe(() => {
      this.router.navigate(['/projects']);
    });
    return deleteProjectObservable$;
  }
}
