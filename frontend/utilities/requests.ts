import axios, {AxiosError, AxiosResponse} from "axios";
import {NextRouter} from "next/router"
import React from "react";
import {loginResponse} from "../utilities/types"
import {user, error, message, chat} from "./types"



export const signup = async (
    data:FormData, 
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setUser:React.Dispatch<React.SetStateAction<user | {}>>,
    setError:React.Dispatch<React.SetStateAction<string | undefined>>,
    router:NextRouter
    )=>{
    const config = {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
    axios.post("http://localhost:5000/api/v1/register", data, config).then(res=>{
            console.log(res.data)
            setLoading(false)
            setUser(res.data.user)
            setError(undefined)
            router.push("/app")
            localStorage.setItem("token", res.data.token)
        return res.data
        }).catch((err:AxiosError)=>{
            console.log(err.response)
            setError(err.response?.data.error)
        })
    
   
}

export const login = (
    data:FormData,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setUser:React.Dispatch<React.SetStateAction<user | undefined>>,
    setError:React.Dispatch<React.SetStateAction<string | null>>,
    router: NextRouter
    )=>{
    
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    axios.post("http://localhost:5000/api/v1/login", data, config)
    .then((res:AxiosResponse<loginResponse>)=>{
        const data = res.data
        console.log(data.user)
        setLoading(false);
        setUser(data.user)
        localStorage.setItem("token", data.token);
        router.push("/app")
    })
    .catch((err:AxiosError<error>)=>{
        console.log("login error", err)
        setError(err.response!.data.error)
        setUser(undefined);
        setLoading(false)
    })
}

export const me = (
    me:[undefined | user, React.Dispatch<React.SetStateAction<undefined | user>>],
    router: NextRouter
    ) => {
    const token = localStorage.getItem("token")
    
    if(token){
        const headers = {
            headers:{
            "Token":token
            }
        }
        axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/me`, headers)
        .then((res:AxiosResponse<loginResponse>)=>{
            const user = res.data.user;
            const meContext = me[0]
            if(!meContext){
                me[1](user)
            }
        })
        .catch ((err:AxiosError<error>)=> {
            console.log("Error loading user, resetting token", err)
            router.push("/")
            localStorage.removeItem("token")
            me[1](undefined)
        })
    }else{
        console.log("No token")
        me[1](undefined)
        router.push("/")
    }
}

export const getUsers = async (setUsers:React.Dispatch<React.SetStateAction<user[] | undefined>>)=>{
    const token = localStorage.getItem("token")
    if(token){
        axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/users`, {
            headers:{"Token":token}
        })
        .then((res:AxiosResponse<{success:boolean, users:user[]}>) => {
            console.log()
            setUsers(res.data.users)
        })
    }
    
}

export const getUser = async (id:number, setUser:React.Dispatch<React.SetStateAction<user | undefined>>) => {
    const token = localStorage.getItem("token")
    if(token){
    const config = {
        headers:{
            "Token": token
        }
    }
    axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/user/${id}`, config)
    .then((res:AxiosResponse)=>{
       console.log("getting user", res.data.user)
       setUser(res.data.user)
    })
    .catch((err)=>{
        console.log("Error in getUser", err)
    })
}
}

export const trial = async ()=> {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/trial`)

    console.log(res.data)
}

export const saveSessionID = (session:string)=>{
    const token = localStorage.getItem("token")
    
    const data = new FormData();
    data.set("sessionID", session)

    if(token){

        const config = {
            headers:{
                "Token":token,
                "Content-Type":"application/json"
            }
        }
        console.log("saving", token, data.get("sessionID"), config)
        axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/save/sessionID`, data, config)
        .then((res:AxiosResponse)=>{
            alert(`user session ${session} saved`)
        })
        .catch((err:AxiosError)=>{
            console.log("error saving sessionID", err.message)
        })
    }
}

export const saveMessage = (data:FormData)=>{
    const token = localStorage.getItem("token");

    if(token){
        const config = {
            headers:{
                "Token":token
            }
        }
        axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/save/message`, data, config)
        .then((res:AxiosResponse)=>{
            
        })
        .catch((err:AxiosError)=>{
            console.log("SSaving message error", err)
        })
    }
}

export const getMessages = (id:string, setMessages:React.Dispatch<React.SetStateAction<message[]|[]>>)=>{
    const token = localStorage.getItem("token");
    
    if(token){
        const config = {
            headers:{
                "Token":token
            }
        }

        axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/messages?receiver=${id}`, config)
        .then((res:AxiosResponse)=>{
            console.log("Gotten messages", res)
            setMessages([...res.data.messages])
        })
    }
}

export const getChats = (setChats:React.Dispatch<React.SetStateAction<chat[]>>) => {
    const token = localStorage.getItem("token");
    if(token){
        const config = {
            headers:{
                "Token":token
            }
        }

        axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/chats`, config)
        .then((res:AxiosResponse) => {
            
            setChats(res.data.chats)
        })  
        .catch((err:AxiosError) => {
            console.log("Error loading previos chats", err)
        })
    }
}