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
  SkyAppConfig
} from '@skyux/config';

import {
  StacheTitleService
} from './title.service';

import {
  StachePageAnchorModule
} from '../page-anchor/page-anchor.module';

import {
  StacheLayoutModule
} from '../layout/layout.module';

import {
  StacheAnalyticsModule
} from '../analytics/analytics.module';

import {
  StacheFooterModule
} from '../footer/footer.module';

import {
  StacheJsonDataModule
} from '../json-data/json-data.module';

import {
  StacheOmnibarAdapterService
} from '../shared/omnibar-adapter.service';

import {
  StacheWindowRef
} from '../shared/window-ref';

import {
  StacheWrapperComponent
} from './wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StacheAnalyticsModule,
    StacheJsonDataModule,
    StachePageAnchorModule,
    StacheLayoutModule,
    StacheFooterModule
  ],
  declarations: [
    StacheWrapperComponent
  ],
  exports: [
    StacheWrapperComponent
  ],
  providers: [
    StacheOmnibarAdapterService,
    StacheTitleService,
    StacheWindowRef,
    SkyAppConfig
  ]
})
export class StacheWrapperModule { }
