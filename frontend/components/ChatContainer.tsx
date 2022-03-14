import React, {useEffect, useContext, useState, Context} from 'react';
import {useRouter} from "next/router";
import {MyContext} from "./Context"
import Navigation from "./Navigation"
import Messenger from "./Messenger"
import {me} from "../utilities/requests"
import {user, loggedIn, message} from "../utilities/types"

interface Props { 
  active:user | undefined,
  messages:message[],
  handleMyMessage:(msg:string)=>void,
}


const ChatContainer= (props:Props) => {
  const {handleMyMessage, active, messages} = props
  const router = useRouter()
  const context = useContext(MyContext) as {user:[undefined | user, React.Dispatch<React.SetStateAction<undefined | user>>]}
  
  const [activeChat, setActiveChat] = useState<undefined | user>(undefined)
  
  useEffect(()=>{
    console.log("context in chat container", context)
  
  }, [])

  return (
    <>
     <div className="grow relative min-h-screen  md:pb-0 flex flex-col">
          <div className="border-b border-slate-300 p-3 dark:border-slate-600">
          {active ? active.username : "Select Chat"}
          </div>
          <div className="min-h-full grow p-2 ">
          {messages.map((data)=>{
            return <p className={`flex my-1 flex-col  ${context.user[0] && data.username === context.user[0].username ? "items-end" : "items-start"}`}>
              <span className={`p-2 max-w-lg rounded-lg text-slate-900 ${context.user[0] && data.username === context.user[0].username ? "bg-indigo-600 dark:bg-indigo-900 rounded-br-none" : "bg-indigo-300 dark:bg-indigo-500 rounded-bl-none"} dark:text-slate-50`}>{data.message}</span>
              <span className={`text-slate-500 text-xs dark:text-slate-100`}>{`${new Date(data.time).getHours()}:${new Date(data.time).getMinutes()}`}</span>
              </p>
          })}
          </div>
          <Messenger sendMessage={handleMyMessage} />
        </div>
    </>
  )
}

export default ChatContainer