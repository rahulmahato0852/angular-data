import { createReducer, on } from "@ngrx/store";
import { POSTS, User } from "../../type/user";
import { loginUserFailure, loginUserSuccess, registerUser, registerUserFailure, registerUserSuccess } from "../actions/auth.actions";
import { addPosts, addPostsFailure, addPostsSuccess, deletePostsFailure, deletePostsSuccess, getPostsFailure, getPostsSuccess, updatePostsFailure, updatePostsSuccess } from "../actions/post.actions";

export interface postStateType {
    loading: boolean,
    message: string,
    error: any,
    allPosts: POSTS[],
    count: number
}



const initialState: postStateType = {
    error: null,
    loading: false,
    message: "",
    allPosts: [],
    count: 0
}



export const postreducer = createReducer(
    initialState,
    on(getPostsSuccess, (state, { message, result, count }) => ({ ...state, message, allPosts: result, count })),
    on(getPostsFailure, (state, { error }) => ({ ...state, error })),

    on(addPosts, (state, { }) => ({ ...state })),
    on(addPostsSuccess, (state, { message, newPost }) => ({ ...state, message, allPosts: [...state.allPosts, newPost] })),
    on(addPostsFailure, (state, { error }) => ({ ...state, error })),

    on(deletePostsSuccess, (state, { message, id }) => ({ ...state, message, allPosts: state.allPosts.filter(item => item._id !== id) })),
    on(deletePostsFailure, (state, { error }) => ({ ...state, error })),



    on(updatePostsSuccess, (state, { message, id, updatedData }) => ({ ...state, message, allPosts: state.allPosts.map(item => item._id === id ? updatedData : item) })),
    on(updatePostsFailure, (state, { error }) => ({ ...state, error })),



)


