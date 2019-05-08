import {
  NgModule
} from '@angular/core';

import {
  SkyFluidGridModule
} from '@skyux/layout';

import {
  SkyNavbarModule
} from '@skyux/navbar';

import {
  StacheActionButtonsModule,
  StacheBlockquoteModule,
  StacheCodeModule,
  StacheIncludeModule,
  StacheMarkdownModule,
  StachePageAnchorModule,
  StachePageSummaryModule,
  StacheSidebarModule,
  StacheTutorialModule,
  StacheWrapperModule
} from './public';

@NgModule({
  exports: [
    SkyFluidGridModule,
    SkyNavbarModule,
    StacheActionButtonsModule,
    StacheBlockquoteModule,
    StacheCodeModule,
    StacheIncludeModule,
    StacheMarkdownModule,
    StachePageAnchorModule,
    StachePageSummaryModule,
    StacheSidebarModule,
    StacheTutorialModule,
    StacheWrapperModule
  ]
})
export class AppExtrasModule { }
