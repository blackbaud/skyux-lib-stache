import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import {
  StacheRouterLinkDirective
} from './link.directive';

import {
  StacheNavComponent
} from './nav.component';

import {
  StacheResourcesModule
} from '../shared/stache-resources.module';

import {
  StacheNavService
 } from './nav.service';

@NgModule({
  declarations: [
    StacheNavComponent,
    StacheRouterLinkDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    StacheResourcesModule
  ],
  exports: [
    StacheNavComponent,
    StacheRouterLinkDirective
  ],
  providers: [
    StacheNavService
  ]
})
export class StacheNavModule { }
