import axios, {AxiosError, AxiosResponse} from "axios";
import {NextRouter} from "next/router"
import React from "react";
import toast from "react-hot-toast"
import {loginResponse} from "../utilities/types"
import {user, error, message, chat, group} from "./types"



export const trial = async ()=> {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1`)

    console.log(res.data)
    return res.data
}
export const signup = async (data:FormData)=>{
    const config = {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
    try {

        const res:AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/register`, data, config)
    
        return res.data
    }catch (err:any){
        return err.response
    }
    
   
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

    axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/login`, data, config)
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
    router: NextRouter,
    socket?:any
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
            return user;
        })
        .then(()=>{
            if(socket){
                getMyGroups()
                .then((res)=>{
              
                const groupIds= res.map((grp:group)=>grp.groupid);
            
                socket.emit("groups", groupIds)
                })
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
            console.log("Error loading previous chats", err)
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

export const deleteAccount = async ()=>{
    const token = localStorage.getItem("token");
    if(token){
        const config = {
            headers:{
                "Token":token
            }
        }
        try{
            const res:AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/account/delete`, config);
            return res.data
        }catch(err){
            toast.error("Problem deleting your account.")
        }
        
       
    }
}

export const createGroup = async (data:FormData) => {
    const token = localStorage.getItem("token");
    if(token){
        const config = {
            headers:{
                "Token":token,
                "Content-Type":"multipart/formdata"
            }
        }
        try{
            const res:AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/create/group`, data, config)
            return res;
        }catch(err:any){
            toast.error("Group creation failed")
        }
        
        
    }
}

export const joinGroup = async (data:FormData) => {
    const token = localStorage.getItem("token");
    
    if(token){
        const config = {
            headers:{
                "Token":token,
                "Content-Type":"multipart/form-data"
            }
        }
        try{
            console.log("groupId", data)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/group/join`, data, config)

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

export const getMyGroups = async () => {
    const token = localStorage.getItem("token");
    if(token){
        const config = {
            headers:{
                "Token":token
            }
        }

        try {
            const res:AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/groups/mine`, config);
            console.log("my groups", res.data.myGroups)
            return res.data.myGroups
        } catch (error:any) {
            console.log("Problem loading my groups")
        }
    }
}

export const getMyCreatedGroups = async () => {
    const token = localStorage.getItem("token");
    if(token){
        const config = {
            headers:{
                "Token":token,
            }
        }
        try {
            const res:AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/groups/created`, config)
            return res.data.groups
        } catch (error:any) {
            console.log("Error loading my created groups", error.response.data)
            toast.error("Error loading my created groups")
        }
    }
}

export const getGroup = async (groupid:string) => {
    try {
        const result:AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/group?groupid=${groupid}`)
        return result.data.group
    } catch (error:any) {
        console.log("Problem getting group");
        toast.error("Problem loading group")
    }
}

export const saveGroupMessage = async (data:FormData) => {
    const token = localStorage.getItem("token");
    if(token){
        const config = {
            headers:{
                "Token":token,
                "Content-type":"application/json"
            }
        }
        try{
            const result:AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/save/message/group`, data, config)
            console.log("saving grp msg", result.data.content)
        }catch(err){
            console.log("Error saving message")
        }
    }
}

export const getGroupMessages = async (groupid:string) => {
    const config ={
        headers:{
            "Content-Type":"application/json"
        }
    }
    try{
        const res:AxiosResponse = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/group/messages`, {groupid}, config)
        return res.data.messages
    }catch(err){
        console.log("Problem loading group messages")
    }
}

export const deleteGroup = async (groupid:string) => {
    const token = localStorage.getItem("token");
    if(token){
        const config = {
            headers:{
                "Token":token,
                "Content-Type":"application/json"
            }
        }
        try {
            const res:AxiosResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/group/delete?groupid=${groupid}`, config)
            return res.data.message
        } catch (error:any) {
            console.log(error.response.data)
            toast.error(error.response.data.error);
        }
        
    }
}