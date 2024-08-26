import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { todoStateType } from '../store/todo.reducer';
import { GETTODOS } from '../store/todo.actions';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {


  allTodos: any[] = []

  constructor(private store: Store<{ todoReducer: todoStateType }>) {
    store.select(state => state.todoReducer.todos).subscribe((data) => {
      this.allTodos = data
    })
    store.dispatch(GETTODOS())
  }


}
