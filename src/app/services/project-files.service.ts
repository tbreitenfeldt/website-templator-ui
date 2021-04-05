import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectFile } from '../models/project-file';

@Injectable({
  providedIn: 'root',
})
export class ProjectFilesService {
  constructor(
    private http: HttpClient,
    @Inject('apiUrl') private apiUrl: string
  ) {}

  getProjectFiles(projectId: number): Observable<ProjectFile[]> {
    return this.http.get<ProjectFile[]>(
      `${this.apiUrl}/api/project/${projectId}/files`
    );
  }

  getProjectFile(id: number): Observable<ProjectFile> {
    return this.http.get<ProjectFile>(`${this.apiUrl}/api/project/files/${id}`);
  }

  createProjectFile(projectFile: ProjectFile): Observable<ProjectFile> {
    return this.http.post<ProjectFile>(
      `${this.apiUrl}/api/project/file`,
      projectFile
    );
  }

  updateProjectFile(projectFile: ProjectFile): Observable<ProjectFile> {
    return this.http.put<ProjectFile>(
      `${this.apiUrl}/api/project/file`,
      projectFile
    );
  }

  deleteProject(id: number): Observable<ProjectFile> {
    return this.http.delete<ProjectFile>(
      `${this.apiUrl}/api/project/files/${id}`
    );
  }

  publishProjectFile(id: number): Observable<ProjectFile> {
    return this.http.get<ProjectFile>(
      `${this.apiUrl}/api/project/files/${id}/publish`
    );
  }

  unpublishProjectFile(id: number): Observable<ProjectFile> {
    return this.http.get<ProjectFile>(
      `${this.apiUrl}/api/project/files/${id}/unpublish`
    );
  }
}
