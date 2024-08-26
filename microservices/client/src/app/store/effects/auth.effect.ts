import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import { loginUser, loginUserFailure, loginUserSuccess, registerUser, registerUserFailure, registerUserSuccess } from "../actions/auth.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable()

export class authEffect {


    constructor(private router: Router, private actions: Actions, private authService: AuthService) {

    }


    $registerUser = createEffect(() => {
        return this.actions.pipe(
            ofType(registerUser),
            mergeMap(({ data }) => this.authService.registerUser(data).pipe(
                map(({ message }) => {
                    Swal.fire({
                        icon: "success",
                        text: message
                    })

                    return registerUserSuccess({ message })
                }),
                catchError(err => {
                    Swal.fire({
                        icon: "error",
                        text: err.error.message || err.message
                    })
                    return of(registerUserFailure({ error: err }))
                })
            ))
        )
    })


    $loginUser = createEffect(() => {
        return this.actions.pipe(
            ofType(loginUser),
            mergeMap(({ data }) => this.authService.loginUser(data).pipe(
                map(({ message, result }) => {
                    Swal.fire({
                        icon: "success",
                        text: message
                    })
                    localStorage.setItem("micro-user", JSON.stringify(result))
                    this.router.navigate(['/home'])
                    return loginUserSuccess({ message, result })
                }),
                catchError(err => {
                    Swal.fire({
                        icon: "error",
                        text: err.error.message || err.message
                    })
                    return of(loginUserFailure({ error: err }))
                })
            ))
        )
    })



    // $loginUser = 







}