import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
<<<<<<< Updated upstream
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyAppConfig
} from '@skyux/config';

import {
=======
>>>>>>> Stashed changes
  StacheFooterComponent
} from './footer.component'
;
import {
  StacheNavModule
} from '../nav/nav.module';

import {
  StacheResourcesModule
} from '../shared/stache-resources.module';

@NgModule({
  imports: [
    CommonModule,
    StacheResourcesModule,
    StacheNavModule
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
