import axios from "axios";

export const signup = async (data:{username:string, email:string, password:string, avatar?:string}, avatar:string |null)=>{
    const config = {
        headers:{
            "Content-Type":"multipart/form-data"
        }
    }
    if(avatar){
        data.avatar=avatar
    }
    try{
        const res = await axios.post("/backend/signup", data, config)
        return res.data
    } catch (err) {
        console.log(err)
        return err
    }
   
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
    const res = await axios.get("/api/trial")

    console.log(res.data)
}