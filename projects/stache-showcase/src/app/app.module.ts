import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SkyThemeService } from '@skyux/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [SkyThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
