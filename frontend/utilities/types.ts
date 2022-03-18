export interface user {
    id:number,
    username:string,
    email:string,
    avatar:string,
    avata_public_id:string,
    gender:string,
    role:string,
    socketsessionid?:string
}

export interface loginResponse {
    success:boolean
    message:string,
    user: user,
    token:string
}
export interface error {
    error:string,
    success:boolean,
    stack:string
}

export interface loggedIn {
    sessionID: string,
    userID: number,
    username: string,
}

export interface message {
    content:string,
    senderid:number,
    time:number
}

export interface active{
    sessionID: string,
    userID: number,
    username: string,
}

export interface chat{
    id:number,
    username:string,
    
}