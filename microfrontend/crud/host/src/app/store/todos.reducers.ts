import { createReducer, on } from "@ngrx/store";
import { Todo } from "../types/todo";
import { AddTodo, AddTodoFaliure, AddTodoSuccess, DeleteTodo, DeleteTodoFaliure, DeleteTodoSuccess, GetTodo, GetTodoFaliure, GetTodoSuccess, UpdateTodo, UpdateTodoFaliure, UpdateTodoSuccess } from "./todos.actions";

export interface todoStateType  {
    error:any,
    loading:boolean,
    todos:Todo[],
    message:string
}

const initialState:todoStateType = {
error:null,
loading:false,
message:"",
todos:[]
}

export const TodoReducer  =  createReducer(
     initialState,
     on(AddTodo, (state,{})=> ({...state,loading:true})),
     on(AddTodoSuccess, (state,{todoData})=> ({...state,loading:false, todos:[...state.todos,todoData]})),
     on(AddTodoFaliure, (state,{error})=> ({...state,loading:false,error})),

     on(GetTodo, (state,{})=> ({...state,loading:true})),
     on(GetTodoSuccess, (state,{message,todos})=> ({...state,loading:false, todos,message})),
     on(GetTodoFaliure, (state,{error})=> ({...state,loading:false,error})),


     on(DeleteTodo, (state,{})=> ({...state,loading:true})),
     on(DeleteTodoSuccess, (state,{message,id})=> ({...state,loading:false, todos:state.todos.filter(item => item._id!==id) ,message})),
     on(DeleteTodoFaliure, (state,{error})=> ({...state,loading:false,error})),


     on(UpdateTodo, (state,{})=> ({...state,loading:true})),
     on(UpdateTodoSuccess, (state,{message,updatedTodo})=> ({...state,loading:false, todos:state.todos.map(item => item._id===updatedTodo._id ? updatedTodo : item) ,message})),
     on(UpdateTodoFaliure, (state,{error})=> ({...state,loading:false,error})),


)


