import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../types/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http:HttpClient
  ) { }

  baserUrl = "http://localhost:3000/api/"

  getTodos():Observable<{message:string, todos:Todo[]}> {
    return this.http.get<{message:string, todos:Todo[]}>(this.baserUrl)
  }
  addTodos(arg:Todo):Observable<{message:string, result:Todo}> {
    return this.http.post<{message:string, result:Todo}>(this.baserUrl + "add-todo", arg )
  }
  deleteTodos(arg:string):Observable<{message:string}> {
    return this.http.delete<{message:string}>(this.baserUrl + "delete-todo/" + arg )
  }
  updateTodos(arg:Todo):Observable<{message:string,result:Todo}> {
    return this.http.put<{message:string,result:Todo}>(this.baserUrl + "update-todo/" , arg )
  }


}
