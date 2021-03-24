import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { environment } from '../environments/environment';
import { ProjectsService } from './services/projects.service';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, ProjectsComponent, NavigationBarComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    CKEditorModule,
  ],
  providers: [
    ProjectsService,
    { provide: 'apiUrl', useValue: environment.apiUrl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
