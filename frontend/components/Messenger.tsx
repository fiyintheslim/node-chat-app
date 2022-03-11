import { useContext, useState } from 'react'
import { Socket } from "socket.io-client"
import { MyContext } from "./Context"
import { user } from "../utilities/types"

interface Props { 
  sendMessage:(a:string)=>any
}

const Messenger = (prop:Props) => {
  const context = useContext(MyContext) as { user: [{} | user, React.Dispatch<React.SetStateAction<{} | user>>], socket: Socket }
  const [message, setMessage] = useState<string>("")
  const socket = context.socket
  return (
    <div className="fixed w-full bottom-20 right-0 flex">
      <textarea style={{ resize: "none" }} 
      onKeyUp={(e)=>{
          if(e.key === "Enter"){
            prop.sendMessage(message)
            setMessage("")
          }
        }} value={message} onChange={(e)=>{setMessage(e.target.value)}} className="grow m-1 w-full outline-none bg-indigo-200 border border-slate-400 dark:bg-indigo-600 rounded-md p-2 dark:text-slate-300" >
      </textarea>
      <button
        type="button"
        className="animate-none outline-none w-15 h-15 bg-indigo-700 border-2 dark:bg-slate-500 m-1 rounded-md p-2 active:bg-inherit"
        onClick={()=>{
          prop.sendMessage(message)
          setMessage("")
        }
      }
      >Send</button>
    </div>
  )
}

export default Messenger