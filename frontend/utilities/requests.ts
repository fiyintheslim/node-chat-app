import axios, {AxiosError, AxiosResponse} from "axios";
import {NextRouter} from "next/router"
import React from "react";
import toast from "react-hot-toast"
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
            toast.error(err.response?.data.error)
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
    .catch((err:AxiosError)=>{
        setLoading(false)
        console.log("login error", err)
        //setError(err.response!.data.error)
        setUser(undefined);
        
        toast.error("Wrong email or password.")
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
                console.log("User", user)
                me[1](user)
            }
        })
        .catch ((err:AxiosError)=> {
            console.log("Error loading user, resetting token", err.response)
            router.push("/login")
            localStorage.removeItem("token")
            me[1](undefined)
            toast.error("Error loading user.")
        })
    }else{
        console.log("No token")
        me[1](undefined)
        router.push("/login")
        toast.error("Login to access.")
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
        .catch((err:AxiosError)=>{
            toast.error("Problem loading users.")
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

export const getMessages = (id:string, setMessages:React.Dispatch<React.SetStateAction<message[]>>)=>{
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
        .catch((err:AxiosError)=>{
            toast.error("Problem loading older messages.")
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
            toast.error("Problem loading older chats")
        })
    }
}

export const updateDescription = (description:string, setloading:React.Dispatch<React.SetStateAction<boolean>>, router:NextRouter) => {
    const token = localStorage.getItem("token");
    if(token){
        const config = {
            headers:{
                "Token":token,
                "Content-Type":"application/json"
            }
        }

        axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/update/description`, {description}, config)
        .then((res:AxiosResponse)=>{
            console.log("Update description", res)
            setloading(false)
            toast.success("Profile description updated successfully.")
            router.reload()
        })
        .catch((err:AxiosError)=>{
            setloading(false)
            toast.error("Problem updating profile description.")
        })
    }
}

export const getActivities = async (setActivities:React.Dispatch<React.SetStateAction<{all:string, mine:string, sent:string, received:string} | undefined>>)=>{
    const token =localStorage.getItem("token");
    if(token){
        const config = {
            headers:{
            "Token":token
        }
    }

        axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/activities`, config)
        .then((res:AxiosResponse) => {
            setActivities(res.data.stats)
        })
        .catch((err:AxiosError)=>{

        })
    }
}

export const deleteAccount = async (router: NextRouter)=>{
    const token = localStorage.getItem("token");
    if(token){
        const config = {
            headers:{
                "Token":token
            }
        }

        axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/account/delete`, config)
        .then((res:AxiosResponse)=>{
            localStorage.removeItem("token");
            router.push("/")
        })
        .catch((err:AxiosError)=>{
            toast.error("Problem deleting your account.")
        })
    }
}

export const createGroup = (data:FormData) => {
    const token = localStorage.getItem("token");
    if(token){
        const config = {
            headers:{
                "Token":token,
                "Content-Type":"multipart/formdata"
            }
        }
        axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/create/group`, data, config)
        .then((res:AxiosResponse)=>{
            toast.success("Group created")
        })
        .catch((err:AxiosError)=>{
            toast.error("Group creation failed")
        })
    }
}

export const joinGroup = async (data:string) => {
    const token = localStorage.getItem("token");
    
    if(token){
        const config = {
            headers:{
                "Token":token,
                "Content-Type":"multipart/form-data"
            }
        }
        try{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/group/join`, {groupId:data}, config)
        //.then((res:Axios))
        }catch(err:any){
            console.log(err.response)
        }
    }
}

export const getGroups = async () => {
    try{
        const res:AxiosResponse =  await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/groups`)
        console.log(res)
        return res.data.groups
    }catch(err:any){
        console.log(err.response);
        toast.error("Problem loading groups")
    }
}