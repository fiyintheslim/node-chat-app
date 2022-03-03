import {useContext} from 'react'
import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/router";
import {MyContext} from "./Context"

type Props = {
    avatar: string | undefined
}

const Navigation = (props:Props) => {
    const {avatar} = props
    const context = useContext(MyContext)
    console.log("context", context)
    const router = useRouter();
    const current =router.pathname
    
    const navigate = (url:string)=>{
        return router.push(url)
    }

  return (
    <div className="sticky shadow flex justify-around items-center w-screen left-0 bottom-0 h-20 bg-slate-300 dark:bg-slate-700 md:justify-evenly md:fixed md:left-0 md:bottom-0 md:flex-col md:w-24 md:h-full md:pt-9" style={{opacity:0.8,}}>
        <svg onClick={()=>navigate("/app")} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className={`cursor-pointer ${current === "/app" ? "fill-indigo-700":"fill-slate-500"}`} viewBox="0 0 16 16">
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
        </svg>
        
        <svg onClick={()=>navigate("/app/chat")} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className={`cursor-pointer ${current === "/app/chat" ? "fill-indigo-700":"fill-slate-500"}`} viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        </svg>
        
        <svg onClick={()=>navigate("/app/groups")} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className={`cursor-pointer ${current === "/app/groups" ? "fill-indigo-700":"fill-slate-500"}`} viewBox="0 0 16 16">
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
        </svg>
        
        <div onClick={()=>navigate("/app/profile")} className="flex flex-col items-center cursor-pointer">
            <Image layout="intrinsic" width={20} height={20} src={avatar ? avatar : "/img/user.svg"} />
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className={`cursor-pointer ${current === "/app/profile" ? "fill-indigo-700":"fill-slate-500"}`} viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
        </div>
        
    </div>
  )
}

export default Navigation