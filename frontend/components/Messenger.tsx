import { useContext, useState } from 'react'
import { Socket } from "socket.io-client"
import { MyContext } from "./Context"
import { user } from "../utilities/types"

interface Props { 
  sendMessage:(a:string, ele:React.MutableRefObject<HTMLDivElement | null>)=>any,
  container:React.MutableRefObject<HTMLDivElement | null>
}

const Messenger = (props:Props) => {
  const {container, sendMessage} = props
  const context = useContext(MyContext) as { user: [{} | user, React.Dispatch<React.SetStateAction<{} | user>>], socket: Socket }
  const [message, setMessage] = useState<string>("")
  const socket = context.socket
  return (
    <div className="absolute w-full bottom-20 right-0 flex md:bottom-0">
      <textarea style={{ resize: "none" }} 
      onKeyPress={(e)=>{
        console.log("key", e.key, e.which)
          if(e.key === "Enter"&& /./g.test(message)){
            console.log("sending with enter", message, message.length)
            sendMessage(message, container)
            setMessage("")
          }
        }} value={message} onChange={(e)=>{setMessage(e.target.value)}} className="grow m-1 w-full outline-none bg-indigo-200 border border-slate-400 dark:bg-indigo-400 rounded-md p-2 dark:text-slate-900" >
      </textarea>
      <button
        type="button"
        className="animate-none outline-none w-15 h-15 bg-indigo-700 border-2 dark:bg-slate-500 m-1 rounded-md p-2 active:bg-inherit"
        onClick={()=>{
          sendMessage(message, container)
          setMessage("")
        }
      }
      >Send</button>
    </div>
  )
}

export default Messenger