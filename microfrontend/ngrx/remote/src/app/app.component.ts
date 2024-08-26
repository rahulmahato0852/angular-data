import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { todoStateType } from './store/todo.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'remote';
  allTodos: any[] = []





}
