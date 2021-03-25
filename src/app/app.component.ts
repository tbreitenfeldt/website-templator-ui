import { Component, OnInit } from '@angular/core';
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
    public titleService: TitleService,
    public skipLinkService: SkipLinkService
  ) {}

  ngOnInit(): void {
    this.skipLinkService.setupSkipLinkPath();
  }
}
