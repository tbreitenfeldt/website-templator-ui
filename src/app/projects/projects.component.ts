import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  isLoading: boolean;

  constructor(private projectsService: ProjectsService) {}

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
