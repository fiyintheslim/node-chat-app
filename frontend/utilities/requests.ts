import axios, {AxiosError, AxiosResponse} from "axios";
import {loginResponse} from "../utilities/types"
import {user, error} from "./types"

export const signup = async (data:FormData)=>{
    const config = {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
    axios.post("http://localhost:5000/api/v1/register", data, config).then(res=>{
            console.log(res.data)
            //localStorage.setItem("user", res.data.user);
            localStorage.setItem("token", res.data.token)
        return res.data
        }).catch((err:AxiosError)=>{
            console.log(err.response)
        })
    
   
}

export const login = async (
    data:FormData,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setUser:React.Dispatch<React.SetStateAction<user | {}>>,
    setError:React.Dispatch<React.SetStateAction<string | null>>
    )=>{
    
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    axios.post("http://localhost:5000/api/v1/login", data, config)
    .then((res:AxiosResponse<loginResponse>)=>{
        console.log(res.data.user)
        setUser(res.data.user)
        setLoading(false);

    })
    .catch((err:AxiosError<error>)=>{
        console.log(err.response!.data.error)
        setError(err.response!.data.error)
        setUser({});
        setLoading(false)
    })
}

export const me = async () => {
    axios.get("http://localhost:5000/api/v1/me")
    .then((res:AxiosResponse)=>{
        console.log(res)
        return JSON.parse(res.data.user)
    })
    .catch ((err:AxiosError<error>)=> {
        console.log(err.response!.data.error)
    })
}

export const trial = async ()=> {
    const res = await axios.get("http://localhost:5000/api/v1/trial")

    console.log(res.data)
}