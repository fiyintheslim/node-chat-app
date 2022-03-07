import axios, {AxiosError, AxiosResponse} from "axios";
import {NextRouter} from "next/router"
import {loginResponse} from "../utilities/types"
import {user, error} from "./types"



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

export const login = async (
    data:FormData,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setUser:React.Dispatch<React.SetStateAction<user | {}>>,
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
        setUser(data.user)
        setLoading(false);
        localStorage.setItem("token", data.token);
        router.push("/app")
    })
    .catch((err:AxiosError<error>)=>{
        console.log("login error", err.response!.data.error)
        setError(err.response!.data.error)
        setUser({});
        setLoading(false)
    })
}

export const me = async (
    me:[undefined | user, React.Dispatch<React.SetStateAction<undefined | user>>],
    router: NextRouter
    ) => {
    const token = localStorage.getItem("token")
    console.log("Server", process.env.NEXT_PUBLIC_SERVER)
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

            if(meContext && Object.keys(meContext).length === 0){
                me[1](user)
            }
            
        })
        .catch ((err:AxiosError<error>)=> {
            router.push("/")
            localStorage.removeItem("token")
            me[1](undefined)
        })
    }else{
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

export const trial = async ()=> {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/api/v1/trial`)

    console.log(res.data)
}