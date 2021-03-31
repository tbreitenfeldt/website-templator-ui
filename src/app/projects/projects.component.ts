import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ErrorService } from '../services/error.service';
import { ProjectsService } from '../services/projects.service';
import { TitleService } from '../services/title.service';
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  isLoading: boolean;

  constructor(
    private projectsService: ProjectsService,
    private titleService: TitleService,
    public errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.isLoading = true;
    this.projectsService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
      this.isLoading = false;
    });
  }

  openCreateProjectModal(
    createProjectModal: CreateProjectModalComponent
  ): void {
    createProjectModal.open().then((result: Project) => {
      if (result) {
        this.projects.push(result);
      }
    });
  }
}
