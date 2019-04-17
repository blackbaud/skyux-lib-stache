import { NgModule } from '@angular/core';

import { StacheRouterLinkDirective } from './link.directive';
import { StacheNavService } from '../nav/nav.service';

@NgModule({
  declarations: [
    StacheRouterLinkDirective
  ],
  exports: [
    StacheRouterLinkDirective
  ],
  providers: [
    StacheNavService
  ]
})
export class StacheLinkModule { }
