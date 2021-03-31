import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { environment } from '../environments/environment';
import { ProjectsService } from './services/projects.service';
import { TitleService } from './services/title.service';
import { ErrorService } from './services/error.service';
import { SkipLinkService } from './services/skip-link.service';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { HomeComponent } from './home/home.component';
import { CreateProjectModalComponent } from './projects/create-project-modal/create-project-modal.component';
import { ViewProjectComponent } from './view-project/view-project.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    HomeComponent,
    CreateProjectModalComponent,
    ViewProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    CKEditorModule,
  ],
  providers: [
    NgbModal,
    Title,
    TitleService,
    ErrorService,
    SkipLinkService,
    ProjectsService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: 'apiUrl', useValue: environment.apiUrl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
