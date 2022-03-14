import {useEffect, useContext, useRef, useState, Dispatch, SetStateAction} from 'react'
import {useRouter} from "next/router"
import Container from "../../components/Container"
import {MyContext} from "../../components/Context"
import ChatContainer from "../../components/ChatContainer"
import {user, loggedIn, message, active} from "../../utilities/types"
import {getUser} from "../../utilities/requests"
import Messenger from "../../components/Messenger"
import socket from "../../utilities/socket"

const Chat = () => {
  const router = useRouter()

  const context = useContext(MyContext) as {user: [undefined | user, Dispatch<SetStateAction<undefined | user>>], loggedIn:[loggedIn[] | undefined, Dispatch<SetStateAction<loggedIn[] | undefined>>]}
  const [chats, setChats] = useState<user[]>([])
  const [active, setActive] = useState<user | undefined>(undefined)
  const [activeSocket, setActiveSocket] = useState<loggedIn | undefined>(undefined)
  const [messages, setMessages] = useState<message[]>([])

  const online = context.loggedIn[0] ? context.loggedIn[0] : undefined

  

  useEffect(()=>{
    socket.on("private_message", (data:message)=>{
      //alert("message received")
      
      setMessages([...messages, data])
      console.log("Received message", data, messages)
    })
  }, [messages])

  useEffect(()=>{
    const id = router.query.id as string
    if(id){
      getUser(parseInt(id), setActive)
    }
  }, [router.isReady])

  useEffect(()=>{
    if(active && !chats){
      setChats([...chats, active])
    }

    if(context.loggedIn[0] && active){
      const ids = context.loggedIn[0].filter((el)=>{
        return el.userID === active.id
      })
      console.log("ids", ids)
      setActiveSocket(ids[ids.length - 1])
      console.log("chats", context.loggedIn[0], activeSocket, active)
    }
    
  }, [active, context.loggedIn[0]])

  const handleMyMessage = (msg:string)=>{
    console.log("send message", active, activeSocket)
    if(context.user[0] && activeSocket){
      let data = {
                  message:msg,
                  username:context.user[0].username,
                  userID:context.user[0].id,
                  time:Date.now()
                }
      let to = activeSocket.sessionID
      
      socket.emit("private_message", {data, to})
      setMessages([...messages, data])
    }
    
  }

  return (
    <Container>
      <div className="flex h-full">
        <div className="basis-1/4 border-r border-slate-300 bg-slate-200 dark:bg-slate-700 dark:border-slate-600">
          <ul>{
            chats.map(el=>(
              <li className="w-full h-10">
                <span className={`h-2 w-2 bg-slate-50 rounded-full`}></span>
                {el.username}
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