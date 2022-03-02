import axios, {AxiosError} from "axios";

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

export const login = async ()=>{
    try{
        const res = await axios.get("/api/trial")
    console.log(res)
    }catch (err){
        console.log(err)
    }
    
}

export const me = async () => {
    try{
        const me = await axios.get("/api/me")
        console.log(me)
        return JSON.parse(me.data)
    } catch (err) {
        console.log(err)
    }
}

export const trial = async ()=> {
    const res = await axios.get("http://localhost:5000/api/v1/trial")

    console.log(res.data)
}