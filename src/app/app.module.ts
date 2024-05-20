import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    NgxPaginationModule,
    FlexLayoutModule,
    HttpClientModule,

    CommonModule,
    RouterOutlet,
    DashboardModule,

    StoreModule.forRoot({}, {})
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  private isDark = false;

  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }

  switchMode(isDarkMode: boolean) {
    this.isDark = isDarkMode;
  }
}
