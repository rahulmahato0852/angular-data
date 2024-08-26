import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosDashboardComponent } from './todos-dashboard/todos-dashboard.component';


@NgModule({
  declarations: [
    TodosDashboardComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
