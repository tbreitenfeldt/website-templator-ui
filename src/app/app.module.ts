import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NgbActiveModal,
  NgbModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
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
import { ViewProjectComponent } from './view-project/view-project.component';
import { ModalComponent } from './modals/modal/modal.component';
import { CreateEditProjectModalComponent } from './modals/create-edit-project-modal/create-edit-project-modal.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { CreateEditFileModalComponent } from './modals/create-edit-file-modal/create-edit-file-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    HomeComponent,
    ViewProjectComponent,
    ModalComponent,
    CreateEditProjectModalComponent,
    ConfirmationModalComponent,
    CreateEditFileModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    CKEditorModule,
  ],
  providers: [
    NgbModal,
    NgbActiveModal,
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
