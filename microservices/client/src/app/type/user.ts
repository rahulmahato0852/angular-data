export interface User {
    name: string,
    email: string,
    mobile: string,
    password: string,
}
export interface LoginCredentials {
    email: string,
    password: string,
}


export interface POSTS {
    title: string,
    desc: string,
    rate: string,
    _id: string
}