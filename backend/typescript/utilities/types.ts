export interface signupUser {
    username:string,
    email:string,
    password:string
}

export interface message {
    id:string,
    message:string
    username:string
}
export interface joinChat {
    id:number,
    username:string,
    time:string
}