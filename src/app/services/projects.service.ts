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
}
