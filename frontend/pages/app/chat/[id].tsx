import {useContext, useEffect} from 'react'
import {Socket} from "socket.io-client"
import ChatContainer from "../../../components/ChatContainer"
import {MyContext} from "../../../components/Context"

const Chat = () => {
  const context = useContext(MyContext) as {socket: Socket }
  useEffect(()=>{
    console.log(context)
    context.socket.emit("join_chat")
  }, [])
  return (
    <ChatContainer>
      <div>Chat</div>
    </ChatContainer>
  )
}

export default Chat