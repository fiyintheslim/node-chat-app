import React, {useState, useContext} from 'react'
import AllGroups from "../../components/AllGroups"
import {MyContext} from "../../components/Context"
import Container from "../../components/Container"
import ChatContainer from "../../components/ChatContainer"
import {saveMessage} from "../../utilities/requests"
import socket from "../../utilities/socket"
import {group, message, user} from "../../utilities/types"

const Groups = () => {
  const context = useContext(MyContext) as {user: [undefined | user, React.Dispatch<React.SetStateAction<undefined | user>>]}


  const [groups, setGroups] = useState<group[]>([]);
  const [activeGroup, setActiveGroup] = useState<group>()
  const [showGroups, setShowGroups] = useState(false)
  const [messages, setMessages] = useState<message[]>([])
  const [groupID, setGroupID] = useState<string>()
  const [allGroups, setAllGroups] = useState(false)

  const selectGroup = (id:string) => {

  }
  const change = ()=> {
    setAllGroups(!allGroups)
  }
  const handleMyMessage = (msg:string, ele:React.MutableRefObject<HTMLDivElement | null>)=>{
    let time = Date.now()
    if(context.user[0] && groupID && msg){
      let data = {
        content:msg,
        senderid:context.user[0].id,
        time
      }
      setMessages([...messages, data])
      
      const formData = new FormData();
      formData.set("senderID", context.user[0].id.toString())
      formData.set("receiverID", groupID as string)
      formData.set("content", msg)
      formData.set("time", time.toString())
      

      saveMessage(formData)
    
      setTimeout(()=>{
        if(ele.current){
          ele.current.scrollTop = ele.current.scrollHeight
        }
      }, 200)
    
    if(groupID){
      let to = groupID
      
      socket.emit("group_message", {data, to})
      setMessages([...messages, data])
    }
  }
    
  }
  return (
    <Container>
    <div className="flex h-full relative">
      <div className={`absolute h-full overflow-y-scroll w-64 z-30 left-0 ${showGroups ? "block" : "hidden"} md:block top-0 md:basis-1/4 md:static border-r border-slate-300 bg-slate-200 dark:bg-slate-700 dark:border-slate-600`}>
        <ul>
        <li onClick={change} className="pl-2 cursor-pointer h-12 w-full flex items-center border-b border-slate-300 dark:border-slate-500">{allGroups ? "My Groups":"All groups"}</li>
          {
          groups.map((el, i)=>(
            <li key={i} className="w-full h-12">
              <p onClick={()=>selectGroup(el.id)} className={`cursor-pointer h-full w-full flex items-center border-b border-slate-300 ${ activeGroup && activeGroup.id === el.id ? "bg-slate-400 dark:bg-slate-500 dark:text-slate-900" : ""} dark:border-slate-500`}>
                <span>{el.groupname}</span>
              </p>
            </li>))
        }</ul>
      </div>
      {allGroups ?
      <AllGroups />
      :
      <ChatContainer group={activeGroup} messages={messages} handleMyMessage={handleMyMessage} setShowChats={setShowGroups} showChats={showGroups} message={"Select group chat."} />
      }
    </div>
  </Container>
  )
}

export default Groups