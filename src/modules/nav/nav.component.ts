import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StacheNavLink } from '../nav-link';

@Component({
  selector: 'stache-nav',
  templateUrl: './nav.component.html'
})
export class StacheNavComponent implements OnInit {
  @Input() public routes: StacheNavLink[];
  @Input() public navType: string;

  public classname: string = '';

  public constructor(private router: Router) {}

  public isActive(route: any): boolean {
    let path = route.path;

    if (path.join) {
      path = path.join('/');
    }

    if (route.fragment) {
      return (this.router.url === `${path}#${route.fragment}`);
    } else {
      return this.router.url === path;
    }
  }

  public navigate(route: any): void {
    let extras: { fragment?: string; } = {};

    if (route.fragment) {
      extras.fragment = route.fragment;
    }

    this.router.navigate(route.path, extras);
  }

  public ngOnInit(): void {
    if (this.navType) {
      this.classname = `stache-nav-${this.navType}`;
    }
  }
}
