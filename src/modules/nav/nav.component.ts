import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StacheNavLink } from '../nav-link';

@Component({
  selector: 'stache-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class StacheNavComponent implements OnInit {
  @Input()
  public routes: StacheNavLink[];

  @Input()
  public navType: string;

  public classname: string = '';

  public constructor(private router: Router) {}

  public hasRoutes(): boolean {
    return (this.routes && this.routes.length > 0);
  }

  public isActive(route: any): boolean {
    let path = route.path;

    if (path.join) {
      path = path.join('/');
    }

    if (this.router.url.includes('#')) {
      return (this.router.url.split('#')[0] === path);
    } else {
      return (this.router.url === path);
    }
  }

  public navigate(route: any): void {
    let extras: { fragment?: string; } = {};

    if (route.fragment) {
      extras.fragment = route.fragment;
    }

    if (Array.isArray(route.path)) {
      this.router.navigate(route.path, extras);
    } else {
      this.router.navigate([route.path], extras);
    }
  }

  public ngOnInit(): void {
    if (this.navType) {
      this.classname = `stache-nav-${this.navType}`;
    }
  }
}