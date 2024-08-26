import { loadRemoteModule } from '@angular-architects/native-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "admin", loadChildren: () => loadRemoteModule("admin", 'App').then(a => a.AppModule).catch(err => console.log(err)
    )
  },
  {
    path: "user", loadChildren: () => loadRemoteModule("user", 'Todo').then(d => d.TodosModule).catch(err => console.log(err)
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
