import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosDashboardComponent } from './todos-dashboard/todos-dashboard.component';

const routes: Routes = [
  { path: "", component: TodosDashboardComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
