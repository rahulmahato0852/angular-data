import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodoService } from "../services/todo.service";
import { AddTodo, AddTodoFaliure, AddTodoSuccess, DeleteTodo, DeleteTodoFaliure, DeleteTodoSuccess, GetTodo, GetTodoFaliure, GetTodoSuccess, UpdateTodo, UpdateTodoFaliure, UpdateTodoSuccess } from "./todos.actions";
import { catchError, map, mergeMap, of, retry } from "rxjs";

@Injectable()
export class TodoEffect  {


    constructor(private actions:Actions, private todoService:TodoService) {}


    $getTodos = createEffect(()=>{
        return this.actions.pipe(
            ofType(GetTodo),
            mergeMap(({})=> this.todoService.getTodos().pipe(
                map(({message,todos})=> {
                    console.log(message, todos);

                    return GetTodoSuccess({message,todos})
                } ),
                catchError((error) => of(GetTodoFaliure({error})))
            ) )
        )
    })

    $addTodos = createEffect(()=>{
        return this.actions.pipe(
            ofType(AddTodo),
            mergeMap(({todoData})=> this.todoService.addTodos(todoData).pipe(
                map(({message,result})=> {
                    console.log(message, result);
                    
                    return AddTodoSuccess({message,todoData:result})

                } ),
                catchError((error) => of(AddTodoFaliure({error})))
            ) )
        )
    })

    $deleteTodos = createEffect(()=>{
        return this.actions.pipe(
            ofType(DeleteTodo),
            mergeMap(({id})=> this.todoService.deleteTodos(id).pipe(
                map(({message,})=> DeleteTodoSuccess({message,id}) ),
                catchError((error) => of(DeleteTodoFaliure({error})))
            ) )
        )
    })
    $updateTodos = createEffect(()=>{
        return this.actions.pipe(
            ofType(UpdateTodo),
            mergeMap(({id,updatedData})=> this.todoService.updateTodos(updatedData).pipe(
                map(({message,result})=> UpdateTodoSuccess({message,updatedTodo:result}) ),
                catchError((error) => of(UpdateTodoFaliure({error})))
            ) )
        )
    })



}