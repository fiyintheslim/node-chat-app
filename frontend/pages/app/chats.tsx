import {useEffect, useContext, useRef, useState, Dispatch, SetStateAction} from 'react'
import {useRouter} from "next/router"
import Container from "../../components/Container"
import {MyContext} from "../../components/Context"
import ChatContainer from "../../components/ChatContainer"
import {user, loggedIn, message} from "../../utilities/types"
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
    if(active && activeSocket){
      let data = {
        to:activeSocket.id,
        message:msg,
        username:active.username,
        time:new Date(Date.now())
      }
      
      socket.emit("private_message", data)
      setMessages([...messages, data])
    }
    
  }

  return (
    <Container>
      <div className="flex h-full">
        <div className="basis-1/4 border-r border-slate-300 dark:bg-slate-700 bg-slate-200 dark:border-slate-600">
          <ul>{
            chats.map(el=>(
              <li className="w-full h-10">
                <span className={`h-2 w-2 bg-slate-50 rounded-full`}></span>
                {el.username}
              </li>))
          }</ul>
          <div>{}</div>
        </div>
        <div className="grow relative min-h-screen  md:pb-0 flex flex-col">
          <div className="border-b border-slate-300 p-3">
          {active ? active.username : "Select Chat"}
          </div>
          <div className="min-h-full grow p-2">
          
          </div>
          <Messenger sendMessage={handleMyMessage} />
        </div>
      </div>
    </Container>
  )
}

export default Chat