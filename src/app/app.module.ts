import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

@NgModule({
  declarations: [AppComponent, ProjectsComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    CKEditorModule,
  ],
  providers: [
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
