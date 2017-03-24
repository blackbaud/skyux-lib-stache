import { StacheNavLink } from '../nav/nav-link';

export interface StacheLayout {
  pageTitle: string;
  breadcrumbsRoutes: StacheNavLink[];
  inPageRoutes: StacheNavLink[];
  showBreadcrumbs: boolean;
  showTableOfContents: boolean;
  sidebarRoutes?: StacheNavLink[];
}