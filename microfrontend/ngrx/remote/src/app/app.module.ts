import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { TodosComponent } from './todos/todos.component';
import { todoReducer } from './store/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffect } from './store/todo.effects';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    AppRoutingModule,
    // StoreModule.forRoot({}),
    // EffectsModule.forRoot([]),
    StoreModule.forFeature("todoReducer", todoReducer),
    EffectsModule.forFeature([TodoEffect]),
    StoreDevtoolsModule.instrument(),

  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
