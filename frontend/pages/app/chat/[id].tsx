import {useContext, useEffect} from 'react'
import {Socket} from "socket.io-client"
import ChatContainer from "../../../components/ChatContainer"
import {MyContext} from "../../../components/Context"
import {user} from "../../../utilities/types"

const Chat = () => {
  const context = useContext(MyContext) as {user: [{} | user, React.Dispatch<React.SetStateAction<{} | user>>],socket: Socket }
  const meContext = context.user[0] as user
  useEffect(()=>{
    console.log(context)
    if(context.user[0] != {}){
      const data = {
        cacophoneId:meContext.id,
        username:meContext.username,
        time:`${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
      }
      context.socket.emit("join_chat", data)
    }
  }, [])
  return (
    <ChatContainer>
      <div>Chat</div>
    </ChatContainer>
  )
}

export default Chat