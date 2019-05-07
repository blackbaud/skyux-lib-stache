import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyAppConfig
} from '@skyux/config';

import {
  StacheFooterComponent
} from './footer.component'
;
import {
  StacheNavModule
} from '../nav/nav.module';

import {
  StacheResourcesModule
} from '../shared/stache-resources.module';

import {
  StacheSharedModule
} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StacheSharedModule,
    StacheResourcesModule,
    StacheNavModule,
    SkyI18nModule
  ],
  providers: [
    SkyAppConfig
  ],
  declarations: [
    StacheFooterComponent
  ],
  exports: [
    StacheFooterComponent
  ]
})
export class StacheFooterModule { }
