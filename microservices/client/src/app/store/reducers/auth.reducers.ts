import { createReducer, on } from "@ngrx/store";
import { User } from "../../type/user";
import { loginUserFailure, loginUserSuccess, registerUser, registerUserFailure, registerUserSuccess } from "../actions/auth.actions";

export interface authStateType {
    loading: boolean,
    message: string,
    error: any,
    user: User | null,
}



const initialState: authStateType = {
    error: null,
    loading: false,
    message: "",
    user: null
}



export const authReducer = createReducer(
    initialState,
    on(registerUserSuccess, (state, { message }) => ({ ...state, message })),
    on(registerUserFailure, (state, { error }) => ({ ...state, error })),


    on(loginUserSuccess, (state, { message, result }) => ({ ...state, message, user: result })),
    on(loginUserFailure, (state, { error }) => ({ ...state, error })),


)


