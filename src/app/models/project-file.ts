import { Project } from './project';

export interface ProjectFile {
  id: number;
  filename: string;
  pageTitle: string;
  content: string;
  createdOn: Date;
  updatedOn?: Date;
  projectId: number;
}
