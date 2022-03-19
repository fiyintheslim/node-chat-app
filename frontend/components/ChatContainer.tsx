import React, {useEffect, useContext, useState, useRef} from 'react';
import {useRouter} from "next/router";
import Image from "next/image";
import {MyContext} from "./Context"
import Navigation from "./Navigation"
import Messenger from "./Messenger"
import {me} from "../utilities/requests"
import {user, loggedIn, message} from "../utilities/types"

interface Props { 
  active:user | undefined,
  messages:message[],
  handleMyMessage:(msg:string, ele:React.MutableRefObject<HTMLDivElement | null>)=>void,
}


const ChatContainer= (props:Props) => {
  const {handleMyMessage, active, messages} = props
  const router = useRouter()
  const context = useContext(MyContext) as {user:[undefined | user, React.Dispatch<React.SetStateAction<undefined | user>>]}
  
  const [activeChat, setActiveChat] = useState<undefined | user>(undefined)
  const bottom = useRef<null | HTMLDivElement>(null)
  
  useEffect(()=>{
    console.log("context in chat container", context)
  
  }, [])

  return (
    <>
     <div className="w-full relative h-full  md:pb-0 flex flex-col">
        <div className="border-b border-slate-300 px-3 py-4 dark:border-slate-600 flex items-center">
          <Image src={active && active.avatar ? active.avatar : "/img/user.svg"} layout="intrinsic" width={30} height={30} className="rounded-full pr-3" />
          <p className="pl-4">{active ? active.username : "Select Chat"}</p>
        </div>
        <div ref={bottom} className="h-full p-2 mb-16 relative overflow-y-scroll">
          {messages.map((data, i)=>{
            let time = typeof data.time === "string" ? parseInt(data.time) : data.time
            return <p key={i} className={`flex my-1 flex-col  ${context.user[0] && data.senderid === context.user[0].id ? "items-end" : "items-start"}`}>
                    <span className={`p-2 max-w-lg rounded-lg text-slate-900 ${context.user[0] && data.senderid === context.user[0].id ? "bg-indigo-600 dark:bg-indigo-900 rounded-br-none" : "bg-indigo-300 dark:bg-indigo-500 rounded-bl-none"} dark:text-slate-50`}>{data.content}</span>
                    <span className={`text-slate-500 text-xs dark:text-slate-100`}>{`${new Date(time).getHours()}:${new Date(time).getMinutes()}`}</span>
                  </p>
          })}
        </div>
        <Messenger sendMessage={handleMyMessage} container={bottom} />
      </div>
    </>
  )
}

export default ChatContainer