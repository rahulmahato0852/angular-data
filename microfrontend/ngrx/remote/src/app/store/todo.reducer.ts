import { createReducer, on } from "@ngrx/store"
import { GETTODOS, GETTODOSFAILURE, GETTODOSSUCCESS } from "./todo.actions"

export interface todoStateType {
    todos: any[],
    error: any
}

const initialState: todoStateType = { error: null, todos: [] }



export const todoReducer = createReducer(
    initialState,
    on(GETTODOS, (state, { }) => ({ ...state })),
    on(GETTODOSSUCCESS, (state, { todos }) => {
        console.log("todos", todos);
        return ({ ...state, todos })
    }),
    on(GETTODOSFAILURE, (state, { error }) => ({ ...state, error })),
)

