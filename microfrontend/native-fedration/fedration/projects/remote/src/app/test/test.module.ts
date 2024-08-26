import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { Route, RouterModule } from '@angular/router';

const route: Route = { path: "", component: TestComponent }

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([route]),
  ]
})
export class TestModule { }
