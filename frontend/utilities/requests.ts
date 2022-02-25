import axios from "axios";

export const login = async ()=>{
    try{
        const res = await axios.get("/api/trial")
    console.log(res)
    }catch (err){
        console.log(err)
    }
    
}