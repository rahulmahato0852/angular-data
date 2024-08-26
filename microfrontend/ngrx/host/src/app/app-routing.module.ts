import { loadRemoteModule } from '@angular-architects/native-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostTodosComponent } from './host-todos/host-todos.component';

const routes: Routes = [
  { path: "remote", loadChildren: () => loadRemoteModule("remote", "app").then(a => a.AppModule) },
  { path: "todos-host", component: HostTodosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { };
