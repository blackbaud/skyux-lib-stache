import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  StacheAffixModule
} from '../affix/affix.module';

import {
  StacheNavModule
} from '../nav/nav.module';

import {
  StacheTableOfContentsComponent
} from './table-of-contents.component';

import {
  StacheTableOfContentsWrapperComponent
} from './table-of-contents-wrapper.component';

import {
  StacheResourcesModule
} from '../shared/stache-resources.module';

@NgModule({
  declarations: [
    StacheTableOfContentsWrapperComponent,
    StacheTableOfContentsComponent
  ],
  imports: [
    CommonModule,
    StacheNavModule,
    StacheAffixModule,
    StacheResourcesModule
  ],
  exports: [
    StacheTableOfContentsWrapperComponent,
    StacheTableOfContentsComponent
  ]
})
export class StacheTableOfContentsModule { }
