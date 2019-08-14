import {
  NavigationExtras
} from '@angular/router';

export interface StacheNavLink {
  name: string;
  path: string[] | string;
  order?: number;
  offsetTop?: number;
  children?: StacheNavLink[];
  fragment?: string;
  extras?: NavigationExtras;
  icon?: string;
  summary?: string;
  isActive?: boolean;
  isCurrent?: boolean;
  showInNav?: boolean;
}
