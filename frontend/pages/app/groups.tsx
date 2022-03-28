import React, {useState, useContext, useEffect} from 'react'
import AllGroups from "../../components/AllGroups"
import {MyContext} from "../../components/Context"
import Container from "../../components/Container"
import ChatContainer from "../../components/ChatContainer"
import {saveMessage, joinGroup, getGroups, getMyGroups, getGroup, saveGroupMessage, getGroupMessages} from "../../utilities/requests"
import socket from "../../utilities/socket"
import {group, message, user} from "../../utilities/types"

const Groups = () => {
  const context = useContext(MyContext) as {user: [undefined | user, React.Dispatch<React.SetStateAction<undefined | user>>]}

  const [groups, setGroups] = useState<group[]>([]);
  const [activeGroup, setActiveGroup] = useState<group>()
  const [showGroups, setShowGroups] = useState(false)
  const [messages, setMessages] = useState<message[]>([])
  const [allGroups, setAllGroups] = useState(false)

//getting a ll groups and groups joined
  useEffect(()=>{
    loadMyGroups()
    socket.on("group_message", (data)=>{
      alert("message")
    })
  }, [])
//getting older messages for selscted group
  useEffect(()=>{
    if(activeGroup){
      getGroupMessages(activeGroup.groupid)
      .then((res)=>{
        setMessages(res)
      })
    }
    
  }, [activeGroup])

 const loadMyGroups = ()=>{
  getMyGroups()
  .then(res=>{
    setGroups(res)
    console.log("groups", res)
  })
 }

  const selectGroup = (id:string) => {
    getGroup(id)
    .then((res)=>{
      setActiveGroup(res)
      setAllGroups(false)
      setShowGroups(false)
    })
  }
  const change = ()=> {
    setAllGroups(!allGroups)
    setShowGroups(false)
  }
  const handleMyMessage = (msg:string, ele:React.MutableRefObject<HTMLDivElement | null>)=>{
    let time = Date.now()
    if(context.user[0] && activeGroup && activeGroup.groupid && msg){
      let data = {
        content:msg,
        senderid:context.user[0].id,
        time,
        username:context.user[0].username
      }
      setMessages([...messages, data])
      
      const formData = new FormData();
      formData.set("senderid", context.user[0].id.toString())
      formData.set("groupid", activeGroup.groupid)
      formData.set("content", msg)
      formData.set("time", time.toString())
      

      saveGroupMessage(formData)
    
      setTimeout(()=>{
        if(ele.current){
          ele.current.scrollTop = ele.current.scrollHeight
        }
      }, 200)
    
    if(activeGroup && activeGroup.groupid){
      let to = activeGroup.groupid
      
      socket.emit("group_message", {data, to})
      setMessages([...messages, data])
    }
  }
    
  }
  return (
    <Container>
    <div className="flex h-full relative">
      <div className={`moz-scroll absolute h-full overflow-y-scroll w-64 z-30 left-0 ${showGroups ? "block" : "hidden"} md:block top-0 md:basis-1/4 md:static border-r border-slate-300 bg-slate-200 dark:bg-slate-700 dark:border-slate-600`}>
        <ul>
          <li onClick={change} className="my-3 cursor-pointer h-12 w-full flex justify-center items-center ">
            <span className="text-center rounded-full bg-indigo-500 dark:bg-indigo-800 p-3 w-2/3">{allGroups ? "My Groups":"All groups"}</span>
          </li>
          {
          groups.map((el, i)=>(
            <li onClick={(e)=>selectGroup(el.groupid)} key={el.groupid} className="w-full h-12">
              <p onClick={()=>selectGroup(el.groupid)} className={`cursor-pointer h-full w-full flex items-center border-b border-t border-slate-300 ${ activeGroup && activeGroup.groupid === el.groupid ? "bg-slate-400 dark:bg-slate-500 dark:text-slate-900" : ""} dark:border-slate-500`}>
                <span className="px-3">{el.groupname}</span>
              </p>
            </li>))
        }</ul>
      </div>
      {allGroups ?
      <AllGroups setShowChats={setShowGroups} showChats={showGroups} myGroups={groups} loadMyGroups={loadMyGroups}/>
      :
      <ChatContainer group={activeGroup} messages={messages} handleMyMessage={handleMyMessage} setShowChats={setShowGroups} showChats={showGroups} message={"Select group chat."} />
      }
    </div>
  </Container>
  )
}

export default Groups