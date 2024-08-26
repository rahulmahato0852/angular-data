import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosModule } from './todos/todos.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    TodosModule
  ]
})
export class AppRoutingModule { }
