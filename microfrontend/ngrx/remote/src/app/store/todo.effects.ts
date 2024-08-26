import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { GETTODOS, GETTODOSFAILURE, GETTODOSSUCCESS } from "./todo.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { HttpClient } from "@angular/common/http";





@Injectable()

export class TodoEffect {

    constructor(private actions: Actions, private http: HttpClient) { }


    getTodos = createEffect(() => {
        return this.actions.pipe(
            ofType(GETTODOS),
            mergeMap(() => this.http.get<any[]>("https://jsonplaceholder.typicode.com/todos").pipe(
                map((todos) => GETTODOSSUCCESS({ todos })),
                catchError((error) => of(GETTODOSFAILURE({ error })))
            ))
        )
    })


}