import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ViewProjectComponent } from './view-project/view-project.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    data: { title: 'Home' },
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: { title: 'Projects' },
  },
  {
    path: 'projects/:id',
    component: ViewProjectComponent,
    data: { title: 'Project' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
