import { Component } from '@angular/core';
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'remote2';
  allTodos: any[] = [];
  constructor(private todosStore: Store<{ todoReducer:  {
    todos: any[],
    error: any
} }>) {
    console.log(todosStore);
    
    todosStore.select(state => {
      console.log(state.todoReducer);
      
    });
    
    todosStore.select(state => state.todoReducer.todos).subscribe((data) => {
      this.allTodos = data
    })
  }


}
