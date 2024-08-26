import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-host-todos',
  templateUrl: './host-todos.component.html',
  styleUrl: './host-todos.component.css'
})
export class HostTodosComponent {


  allTodos: any[] = []

  constructor(private store: Store<{ todoReducer: any }>) {
    store.select(state => state.todoReducer.todos).subscribe((data) => {
      this.allTodos = data
    })
  }



}
