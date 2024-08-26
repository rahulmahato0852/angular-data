import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeComponent } from './practice/practice.component';

const routes: Routes = [
  { path: "", loadChildren: () => import('../app/auth/auth-routing.module').then(a => a.AuthRoutingModule).catch(err => err) },
  { path: "home", loadChildren: () => import('../app/user/user-routing.module').then(a => a.UserRoutingModule).catch(err => err) },
  { path: "practice", component: PracticeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
