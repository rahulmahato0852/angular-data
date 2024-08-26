import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NewPagiComponent } from './new-pagi/new-pagi.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "pagi", component: NewPagiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
