import { createAction, props } from "@ngrx/store";
import { Todo } from "../types/todo";

export const AddTodo = createAction("ADD TODO", props<{todoData:Todo}>());
export const AddTodoSuccess = createAction("ADD TODO SUCCESS", props<{todoData:Todo, message:string}>());
export const AddTodoFaliure = createAction("ADD TODO FAILURE", props<{error:any}>());


export const GetTodo = createAction("GET TODO");
export const GetTodoSuccess = createAction("GET TODO SUCCESS", props<{todos:Todo[], message:string}>());
export const GetTodoFaliure = createAction("GET TODO FAILURE", props<{error:any}>());



export const UpdateTodo = createAction("UPDATE TODO", props<{id:string,updatedData:Todo}>());
export const UpdateTodoSuccess = createAction("UPDATE TODO SUCCESS", props<{updatedTodo:Todo, message:string}>());
export const UpdateTodoFaliure = createAction("UPDATE TODO FAILURE", props<{error:any}>());



export const DeleteTodo = createAction("DELETE TODO", props<{id:string}>());
export const DeleteTodoSuccess = createAction("DELETE TODO SUCCESS", props<{id:string, message:string}>());
export const DeleteTodoFaliure = createAction("DELETE TODO FAILURE", props<{error:any}>());


