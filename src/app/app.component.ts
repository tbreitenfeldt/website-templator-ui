import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { ErrorService } from './services/error.service';
import { SkipLinkService } from './services/skip-link.service';
import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    public skipLinkService: SkipLinkService,
    public titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.titleService.setupAutomaticPageTitleManagement('#content-title');
    this.skipLinkService.setupSkipLinkPath();
  }
}
