export interface user {
    id:number,
    username:string,
    email:string,
    avatar:string,
    avata_public_id:string,
    gender:string,
    role:string
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