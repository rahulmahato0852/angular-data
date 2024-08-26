import { loadRemoteModule } from '@angular-architects/native-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "", children: [
      {
        path: "", loadChildren: () => loadRemoteModule('admin', 'admin').then((a) => a.AdminModule).catch(err => console.log(err))
      },
      {
        path: "auth", loadChildren: () => loadRemoteModule('auth', 'auth').then((a) => a.AuthenticationModule).catch(err => console.log(err))
      },
      {
        path: "user", loadChildren: () => loadRemoteModule('user', 'user').then((a) => a.UserModule).catch(err => console.log(err))
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
