import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelComponent } from './panel/panel.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {
    path: "", component: DashboardComponent, children: [
      { path: "panel", component: PanelComponent },
      { path: "footer", component: FooterComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
