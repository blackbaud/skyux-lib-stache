import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  StacheResourcesModule
} from '../shared/stache-resources.module';

import {
  StacheBackToTopComponent
} from './back-to-top.component';

@NgModule({
  declarations: [
    StacheBackToTopComponent
  ],
  imports: [
    CommonModule,
    StacheResourcesModule
  ],
  exports: [
    StacheBackToTopComponent
  ]
})
export class StacheBackToTopModule { }
