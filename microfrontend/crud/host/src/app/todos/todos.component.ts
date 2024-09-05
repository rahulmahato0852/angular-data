import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2'
import { todoStateType } from '../store/todos.reducers';
import { Todo } from '../types/todo';
import { AddTodo, DeleteTodo, GetTodo } from '../store/todos.actions';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {

todoForm:FormGroup = new FormGroup({})
allTodos:Todo[] = []
selectedTodo:Todo | null  = null 

constructor(private store:Store<{TodoReducer:todoStateType}> , private fb:FormBuilder){
  this.todoForm = fb.group({
     task:["",Validators.required],
     desc:["",Validators.required],
     skills:fb.array([])
  });

  store.dispatch(GetTodo())

  store.select(state => state.TodoReducer.todos).subscribe((data) =>{
this.allTodos = data
  })

}

handleClass(arg:string):string{  
 return this.todoForm.get(arg)?.touched ? this.todoForm.get(arg)?.errors ? 'is-invalid' : 'is-valid' : ''
}


handleSubmit(){
  if (this.todoForm.invalid) {
      Swal.fire({
        icon:"error",
        text:"All fields are required"
      })
  }else {
    this.store.dispatch(AddTodo({todoData:this.todoForm.value}))
    console.log(this.todoForm.value);
  }
  
}
  


handleDelete(id:string = '') {
  this.store.dispatch(DeleteTodo({id}))
}



setSelectedTodo (item:Todo) {
  this.selectedTodo = item
  for (const key in item) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      // this.todoForm.patchValue(key, item[key as keyof  Todo])
    }
  }
}





}
