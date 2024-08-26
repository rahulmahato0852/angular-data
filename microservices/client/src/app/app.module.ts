import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { authReducer } from './store/reducers/auth.reducers';
import { authEffect } from './store/effects/auth.effect';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { postreducer } from './store/reducers/post.reducer';
import { postEffect } from './store/effects/post.effect';
import { PracticeComponent } from './practice/practice.component';
import { PaginationComponent } from './user/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    PracticeComponent,
  ],
  imports: [
    BrowserModule,
    PaginationComponent,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    FormsModule,
    RouterModule,
    UserModule,
    NgbModule,
    HttpClientModule,
    StoreModule.forRoot({
      authReducer: authReducer,
      postReducer: postreducer,
    }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([authEffect, postEffect])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
