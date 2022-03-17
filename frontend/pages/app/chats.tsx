import {useEffect, useContext, useRef, useState, Dispatch, SetStateAction} from 'react'
import {useRouter} from "next/router"
import Container from "../../components/Container"
import {MyContext} from "../../components/Context"
import ChatContainer from "../../components/ChatContainer"
import {user, loggedIn, message, active} from "../../utilities/types"
import {getUser, saveMessage, getMessages} from "../../utilities/requests"
import Messenger from "../../components/Messenger"
import socket from "../../utilities/socket"

const Chat = () => {
  const router = useRouter()
  const receiverID = useRef<string>()
  const context = useContext(MyContext) as {user: [undefined | user, Dispatch<SetStateAction<undefined | user>>], loggedIn:[loggedIn[] | undefined, Dispatch<SetStateAction<loggedIn[] | undefined>>]}
  const [chats, setChats] = useState<user[]>([])
  const [active, setActive] = useState<user | undefined>(undefined)
  const [activeSocket, setActiveSocket] = useState<loggedIn | undefined>(undefined)
  const [messages, setMessages] = useState<message[]>([])
  const [online, setOnline] = useState<loggedIn[]>([])

  

  
//socket event listener
  useEffect(()=>{
    socket.on("private_message", (data:message)=>{
      setMessages([...messages, data])
    })
  }, [messages])

  useEffect(()=>{
    const id = router.query.id as string
    if(id){
      receiverID.current = id
      getUser(parseInt(id), setActive)
      getMessages(id, setMessages)
    }
  }, [router.isReady])

  useEffect(()=>{
    if(active && !chats.find((e)=>e.id === active.id)){
      setChats([active, ...chats])
    }

    if(context.loggedIn[0] && active){
      setOnline(context.loggedIn[0]);
      const ids = context.loggedIn[0].filter((el)=>{
        return el.userID === active.id
      })
      console.log("ids", ids)
      setActiveSocket(ids[ids.length - 1])
      console.log("chats", context.loggedIn[0], activeSocket, chats)
    }
    
  }, [active, chats, context.loggedIn[0]])

  const handleMyMessage = (msg:string)=>{
    let time = Date.now()
    
    if(context.user[0] && receiverID.current){
      let data = {
        content:msg,
        senderid:context.user[0].id,
        time
      }
      setMessages([...messages, data])

      const formData = new FormData();
      formData.set("senderID", context.user[0].id.toString())
      formData.set("receiverID", receiverID.current)
      formData.set("content", msg)
      formData.set("time", time.toString())
      formData.set("roomID", "null")

      saveMessage(formData)
    
    
    if(activeSocket){
      
      
      let to = activeSocket.sessionID
      
      socket.emit("private_message", {data, to})
      setMessages([...messages, data])
    }
  }
    
  }

  return (
    <Container>
      <div className="flex h-full">
        <div className="basis-1/4 border-r border-slate-300 bg-slate-200 dark:bg-slate-700 dark:border-slate-600">
          <ul>{
            chats.map((el, i)=>(
              <li key={i} className="w-full h-12">
                <p className={`h-full w-full flex items-center border-b border-slate-300`}>
                  <span className={`mx-3 w-2 h-2 rounded-full ${online.find((e)=>e.userID === el.id) ? "bg-green-500" : "bg-slate-400"}`}></span>
                  <span>{el.username}</span>
                </p>
              </li>))
          }</ul>
          <div>{}</div>
        </div>
        <ChatContainer active={active} messages={messages} handleMyMessage={handleMyMessage} />
      </div>
    </Container>
  )
}

export default Chat