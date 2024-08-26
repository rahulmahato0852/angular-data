import { createAction, props } from "@ngrx/store";
import { LoginCredentials, User } from "../../type/user";

export const registerUser = createAction("REGISTER USER", props<{ data: User }>())
export const registerUserSuccess = createAction("REGISTER USER SUCCESS", props<{ message: string }>())
export const registerUserFailure = createAction("REGISTER USER FAILURE", props<{ error: any }>())


export const loginUser = createAction("LOGIN USER", props<{ data: LoginCredentials }>())
export const loginUserSuccess = createAction("LOGIN USER SUCCESS", props<{ result: User, message: string }>())
export const loginUserFailure = createAction("LOGIN USER FAILURE", props<{ error: any }>())

