import { createAction, props } from "@ngrx/store";
import { POSTS } from "../../type/user";

export const getPosts = createAction("GET POSTS", props<{ page: number, searchVal: string }>())
export const getPostsSuccess = createAction("GET POSTS SUCCESS", props<{ message: string, result: POSTS[], count: number }>())
export const getPostsFailure = createAction("GET POSTS failure", props<{ error: any }>())



export const addPosts = createAction("ADD POSTS", props<{ data: POSTS }>())
export const addPostsSuccess = createAction("ADD POSTS SUCCESS", props<{ message: string, newPost: POSTS }>())
export const addPostsFailure = createAction("ADD POSTS FAILURE", props<{ error: any }>())




export const deletePosts = createAction("DELETE POSTS", props<{ id: string }>())
export const deletePostsSuccess = createAction("DELETE POSTS SUCCESS", props<{ message: string, id: string }>())
export const deletePostsFailure = createAction("DELETE POSTS FAILURE", props<{ error: any }>())



export const updatePosts = createAction("UPDATE POSTS", props<{ id: string, updatedData: POSTS }>())
export const updatePostsSuccess = createAction("UPDATE POSTS SUCCESS", props<{ id: string, updatedData: POSTS, message: string }>())
export const updatePostsFailure = createAction("UPDATE POSTS failure", props<{ error: any }>())


