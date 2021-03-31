import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(
    private http: HttpClient,
    @Inject('apiUrl') private apiUrl: string
  ) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/api/projects`);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/api/projects/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/api/projects`, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/api/projects`, project);
  }

  deleteProject(id: number): Observable<Project> {
    return this.http.delete<Project>(`${this.apiUrl}/api/projects/${id}`);
  }
}
