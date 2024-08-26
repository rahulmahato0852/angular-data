import { createAction, props } from "@ngrx/store";

export const GETTODOS = createAction("GETTODOS")
export const GETTODOSSUCCESS = createAction("GETTODOSSUCCESS", props<{ todos: any[] }>())
export const GETTODOSFAILURE = createAction("GETTODOSFAILURE", props<{ error: any }>())