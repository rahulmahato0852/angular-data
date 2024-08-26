import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    AppRoutingModule,
    // StoreModule.forRoot({}),
    // EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { };;
