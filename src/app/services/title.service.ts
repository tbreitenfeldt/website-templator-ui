import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  startWith,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  renderer: Renderer2;
  siteTitle: string = 'Website Templator';
  subTitle: string = 'Home';
  previousSubTitle: string;
  title$: Observable<string>;
  scrollY$ = fromEvent(window, 'scroll').pipe(
    map(() => this.getScrollY()),
    startWith(this.getScrollY()),
    distinctUntilChanged()
  );

  constructor(
    private ngTitleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setPageTitle(subTitle: string, selectorForHeading: string = ''): void {
    this.previousSubTitle = this.subTitle;
    this.subTitle = subTitle;
    this.ngTitleService.setTitle(`${this.subTitle} - ${this.siteTitle}`);
    setTimeout(() => {
      if (selectorForHeading) {
        this.renderer.selectRootElement(selectorForHeading, true).focus();
      }
    }, 200);
  }

  setPreviousPageTitle(selectorForHeading: string = '#content-title'): void {
    this.setPageTitle(this.previousSubTitle, selectorForHeading);
  }

  getSiteTitle(): string {
    return this.siteTitle;
  }

  getSubTitle(): string {
    return this.subTitle;
  }

  getPreviousSubTitle(): string {
    return this.previousSubTitle;
  }

  getPageTitle(): string {
    return `${this.subTitle} - ${this.siteTitle}`;
  }

  getPreviousPageTitle(): string {
    return `${this.previousSubTitle} - ${this.siteTitle}`;
  }

  /**
   * Code from Daniel Marin
   * https://dev.to/thisdotmedia/make-it-accessible-navigation-in-angular-2gee
   * This method should only be called only once from AppComponent.ngOnInit
   * This method also expects that the data property is added to your routes in the app.routing.ts file
   * For example, a route may look like this:
   * const routes: Routes = [{path:'/', component: HomeComponent, data: { title: 'Home'}}]
   */
  setupAutomaticPageTitleManagement(selectorForHeading: string = ''): void {
    // Get the activated route on Navigation end
    const route$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute)
    );

    // Get the first child route AKA the root
    const primaryRoute$ = route$.pipe(
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary')
    );

    // Get the first child route AKA the root
    const routeData$ = primaryRoute$.pipe(mergeMap((route) => route.data));
    // Get the actual title from the route data
    this.title$ = routeData$.pipe(map(({ title }) => title));

    this.title$.subscribe((title) => {
      // Scroll to top
      window.scrollTo(0, 0);
      // Set title to the page and set the focus to element with provided selector
      this.setPageTitle(title, selectorForHeading);
    });
  }

  private getScrollY(): number {
    return Math.round(window.scrollY / 10) * 10;
  }
}
