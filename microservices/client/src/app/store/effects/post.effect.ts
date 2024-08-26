import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addPosts, addPostsFailure, addPostsSuccess, deletePosts, deletePostsFailure, deletePostsSuccess, getPosts, getPostsFailure, getPostsSuccess, updatePosts, updatePostsFailure, updatePostsSuccess } from "../actions/post.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { PostService } from "../../services/post.service";
import Swal from "sweetalert2";

@Injectable()

export class postEffect {


    constructor(private router: Router, private actions: Actions, private postService: PostService) {
    }


    $getPosts = createEffect(() => {
        return this.actions.pipe(
            ofType(getPosts),
            mergeMap(({ page, searchVal }) => this.postService.getPosts(page, searchVal).pipe(
                map(({ message, result, count }) => getPostsSuccess({ message, result, count })),
                catchError((error) => {
                    Swal.fire({
                        icon: "error",
                        text: error.error.message || error.message
                    })
                    return of(getPostsFailure({ error }))
                })
            ))
        )
    })



    $addPosts = createEffect(() => {
        return this.actions.pipe(
            ofType(addPosts),
            mergeMap(({ data }) => this.postService.addPosts(data).pipe(
                map(({ message, result }) => {
                    Swal.fire({
                        icon: "success",
                        text: message
                    })
                    return addPostsSuccess({ message, newPost: result })
                }),
                catchError((error) => {
                    Swal.fire({
                        icon: "error",
                        text: error.error.message || error.message
                    })
                    return of(addPostsFailure({ error }))
                })
            ))
        )
    })


    $deletePosts = createEffect(() => {
        return this.actions.pipe(
            ofType(deletePosts),
            mergeMap(({ id }) => this.postService.deletePosts(id).pipe(
                map(({ message }) => {
                    Swal.fire({
                        icon: "success",
                        text: message
                    })
                    return deletePostsSuccess({ message, id })
                }),
                catchError((error) => {
                    Swal.fire({
                        icon: "error",
                        text: error.error.message || error.message
                    })
                    return of(deletePostsFailure({ error }))
                })
            ))
        )
    })




    $updatePosts = createEffect(() => {
        return this.actions.pipe(
            ofType(updatePosts),
            mergeMap(({ id, updatedData }) => this.postService.updatePosts(id, updatedData).pipe(
                map(({ message }) => {
                    Swal.fire({
                        icon: "success",
                        text: message
                    })
                    return updatePostsSuccess({ message, id, updatedData })
                }),
                catchError((error) => {
                    Swal.fire({
                        icon: "error",
                        text: error.error.message || error.message
                    })
                    return of(updatePostsFailure({ error }))
                })
            ))
        )
    })




}