import {
  NgModule
} from '@angular/core';

import {
  StacheActionButtonsModule,
  StacheBlockquoteModule,
  StacheCodeModule,
  StacheGridModule,
  StacheHeroModule,
  StacheIncludeModule,
  StacheMarkdownModule,
  StachePageAnchorModule,
  StachePageSummaryModule,
  StacheSidebarModule,
  StacheTutorialModule,
  StacheVideoModule,
  StacheWrapperModule
} from './public';

@NgModule({
  exports: [
    StacheActionButtonsModule,
    StacheBlockquoteModule,
    StacheCodeModule,
    StacheGridModule,
    StacheHeroModule,
    StacheIncludeModule,
    StacheMarkdownModule,
    StachePageAnchorModule,
    StachePageSummaryModule,
    StacheSidebarModule,
    StacheTutorialModule,
    StacheVideoModule,
    StacheWrapperModule
  ]
})
export class AppExtrasModule { }
