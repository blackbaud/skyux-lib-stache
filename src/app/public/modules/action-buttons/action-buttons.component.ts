import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  SkyRestrictedViewAuthService
} from '@blackbaud/skyux-lib-restricted-view';

import {
  Subject
} from 'rxjs';

import {
  StacheNavLink
} from '../nav/nav-link';

import {
  InputConverter
} from '../shared/input-converter';

@Component({
  selector: 'stache-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class StacheActionButtonsComponent implements OnDestroy, OnInit {

  @Input()
  public set routes(value: StacheNavLink[]) {
    this._routes = value;
    this.filteredRoutes = this.filterRestrictedRoutes(this.routes, this.isAuthenticated);
  }

  public get routes(): StacheNavLink[] {
    return this._routes || [];
  }

  @Input()
  @InputConverter()
  public showSearch: boolean = true;

  public filteredRoutes: StacheNavLink[];

  public set isAuthenticated(value: boolean) {
    if (value !== this._isAuthenticated) {
      this._isAuthenticated = value;
      this.filteredRoutes = this.filterRestrictedRoutes(this.routes, value);
    }
  }

  public get isAuthenticated(): boolean {
    return this._isAuthenticated || false;
  }

  public searchText: string;

  private ngUnsubscribe = new Subject<void>();

  private _isAuthenticated: boolean;

  private _routes: StacheNavLink[];

  private searchKeys: string[] = ['name', 'summary'];

  public constructor(
    private restrictedViewAuthService: SkyRestrictedViewAuthService
  ) { }

  public ngOnInit() {
    this.filteredRoutes = this.filterRestrictedRoutes(this.routes, this.isAuthenticated);

    this.restrictedViewAuthService.isAuthenticated
      .takeUntil(this.ngUnsubscribe)
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onKeyUp(event: KeyboardEvent) {
    const searchText = (event.target as HTMLInputElement).value;
    this.searchApplied(searchText);
  }

  public searchApplied(searchText: string): void {
    this.searchText = searchText;
    const query = searchText.toLowerCase();

    // If search text is empty, reset array while honoring restricted routes.
    if (!query) {
      this.filteredRoutes = this.filterRestrictedRoutes(this.routes, this.isAuthenticated);
      return;
    }

    // Filter out restricted routes, then apply search.
    this.filteredRoutes =
      this.filterRestrictedRoutes(this.routes, this.isAuthenticated)
        .filter(route => this.isSearchTextInRoute(route, query));
  }

  private isSearchTextInRoute(route: StacheNavLink, query: string): boolean {
    const matchingFields = this.searchKeys.filter(key => {
      const isMatch = ((route as any)[key] && (route as any)[key].toLowerCase().includes(query));
      return isMatch;
    });
    return (matchingFields.length > 0);
  }

  private filterRestrictedRoutes(routes: StacheNavLink[], isAuthenticated: boolean): StacheNavLink[] {
    if (!routes || routes.length === 0 || isAuthenticated) {
      return routes;
    }

    return routes.filter(route => {
      return !route.restricted;
    });
  }
}
