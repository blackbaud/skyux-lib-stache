import { NgModule } from '@angular/core';

const objectAssign = require('es6-object-assign');
objectAssign.polyfill();

import { StacheActionButtonsModule } from './modules/action-buttons';
import { StacheAffixModule } from './modules/affix';
import { StacheAnalyticsModule } from './modules/analytics';
import { StacheBackToTopModule } from './modules/back-to-top';
import { StacheBlockquoteModule } from './modules/blockquote';
import { StacheBreadcrumbsModule } from './modules/breadcrumbs';
import { StacheClipboardModule } from './modules/clipboard';
import { StacheCodeModule } from './modules/code';
import { StacheCodeBlockModule } from './modules/code-block';
import { StacheEditButtonModule } from './modules/edit-button';
import { StacheGridModule } from './modules/grid';
import { StacheHeroModule } from './modules/hero';
import { StacheImageModule } from './modules/image';
import { StacheIncludeModule } from './modules/include';
import { StacheLayoutModule } from './modules/layout';
import { StacheLinkModule } from './modules/link';
import { StacheMarkdownModule } from './modules/markdown';
import { StacheNavModule } from './modules/nav';
import { StachePageAnchorModule } from './modules/page-anchor';
import { StachePageHeaderModule } from './modules/page-header';
import { StachePageSummaryModule } from './modules/page-summary';
import { StacheSharedModule } from './modules/shared';
import { StacheSidebarModule } from './modules/sidebar';
import { StacheTableOfContentsModule } from './modules/table-of-contents';
import { StacheTutorialModule } from './modules/tutorial';
import { StacheTutorialStepModule } from './modules/tutorial-step';
import { StacheVideoModule } from './modules/video';
import { StacheFooterModule } from './modules/footer';
import { StacheWrapperModule } from './modules/wrapper';
import { StacheHideFromSearchModule } from './modules/hide-from-search/hide-from-search.module';

import { SkyCodeBlockModule } from '@blackbaud/skyux-lib-code-block';
import { SkyClipboardModule } from '@blackbaud/skyux-lib-clipboard';
import { StacheInternalModule } from './modules/internal';

import { AppSkyModule } from './app-sky.module';

export * from './modules/shared';

@NgModule({
  exports: [
    AppSkyModule,
    StacheActionButtonsModule,
    StacheAffixModule,
    StacheAnalyticsModule,
    StacheBackToTopModule,
    StacheBlockquoteModule,
    StacheBreadcrumbsModule,
    StacheClipboardModule,
    StacheCodeModule,
    StacheCodeBlockModule,
    StacheEditButtonModule,
    StacheFooterModule,
    StacheGridModule,
    StacheHeroModule,
    StacheHideFromSearchModule,
    StacheImageModule,
    StacheIncludeModule,
    StacheInternalModule,
    StacheLayoutModule,
    StacheLinkModule,
    StacheMarkdownModule,
    StacheNavModule,
    StachePageAnchorModule,
    StachePageHeaderModule,
    StachePageSummaryModule,
    StacheSharedModule,
    StacheSidebarModule,
    StacheTableOfContentsModule,
    StacheTutorialModule,
    StacheTutorialStepModule,
    StacheVideoModule,
    StacheWrapperModule,
    SkyCodeBlockModule,
    SkyClipboardModule
  ]
})
export class StacheModule { }
