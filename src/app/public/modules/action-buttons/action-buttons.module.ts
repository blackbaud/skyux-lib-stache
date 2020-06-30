import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SkyRestrictedViewModule
} from '@blackbaud/skyux-lib-restricted-view';

import {
  SkyActionButtonModule, SkyFluidGridModule
} from '@skyux/layout';

import {
  SkySearchModule
} from '@skyux/lookup';

import {
  StacheNavModule
} from '../nav/nav.module';

import {
  StacheActionButtonsComponent
} from './action-buttons.component';

@NgModule({
  declarations: [
    StacheActionButtonsComponent
  ],
  imports: [
    CommonModule,
    SkyActionButtonModule,
    SkyFluidGridModule,
    SkyRestrictedViewModule,
    SkySearchModule,
    StacheNavModule
  ],
  exports: [
    StacheActionButtonsComponent
  ]
})
export class StacheActionButtonsModule { }
