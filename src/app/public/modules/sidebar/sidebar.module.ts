import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  StacheNavModule
} from '../nav/nav.module';

import {
  StacheSidebarComponent
} from './sidebar.component';

import {
  StacheSidebarWrapperComponent
} from './sidebar-wrapper.component';

import {
  StacheResourcesModule
} from '../shared/stache-resources.module';

@NgModule({
  declarations: [
    StacheSidebarComponent,
    StacheSidebarWrapperComponent
  ],
  imports: [
    CommonModule,
    StacheNavModule,
    StacheResourcesModule
  ],
  exports: [
    StacheSidebarComponent,
    StacheSidebarWrapperComponent
  ]
})
export class StacheSidebarModule { }
