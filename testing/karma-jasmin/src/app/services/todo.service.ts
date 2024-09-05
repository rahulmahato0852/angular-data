import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  allTodos:Todo[] = [] 

  constructor() { }

  addTodo(arg:Todo){
    this.allTodos.push(arg)
  }

  removeTodo(i:number) {
    this.allTodos.splice(i,1);
  }

    


}
