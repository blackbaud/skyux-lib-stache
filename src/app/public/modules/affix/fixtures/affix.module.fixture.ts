import {
  NgModule
} from '@angular/core';

import {
  StacheAffixModule
} from '../affix.module';

import {
  AffixTopFixtureComponent
} from './affix-top.component.fixture';

import {
  AffixFixtureComponent
} from './affix.component.fixture';

import {
  AffixedTestFixtureComponent
} from './affix-test.component.fixture';

@NgModule({
  declarations: [
    AffixedTestFixtureComponent,
    AffixFixtureComponent,
    AffixTopFixtureComponent
  ],
  imports: [
    StacheAffixModule
  ],
  exports: [
    AffixedTestFixtureComponent,
    AffixFixtureComponent,
    AffixTopFixtureComponent
  ]
})
export class AffixFixtureModule { }
