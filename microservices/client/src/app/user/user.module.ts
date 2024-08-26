import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { NewPagiComponent } from './new-pagi/new-pagi.component';


@NgModule({
  declarations: [
    HomeComponent,
    NewPagiComponent
  ],
  imports: [
    CommonModule,
    PaginationComponent,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class UserModule { }
