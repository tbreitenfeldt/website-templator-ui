import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ErrorService } from '../services/error.service';
import { ProjectsService } from '../services/projects.service';

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
}
