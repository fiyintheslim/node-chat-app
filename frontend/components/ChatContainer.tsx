import React, {useEffect, useContext, useState, useRef} from 'react';
import {useRouter} from "next/router";
import Image from "next/image";
import {MyContext} from "./Context"
import Navigation from "./Navigation"
import Messenger from "./Messenger"
import {me, deleteGroup} from "../utilities/requests"
import Modal from "./Modal"
import {user, loggedIn, message, group, groupmessage} from "../utilities/types"
import toast from 'react-hot-toast';

interface Props { 
  active?:user | undefined,
  group?: group | undefined,
  messages:message[],
  handleMyMessage:(msg:string)=>void,
  showChats:boolean,
  setShowChats:React.Dispatch<React.SetStateAction<boolean>>,
  message:string
}


const ChatContainer= (props:Props) => {
  const {handleMyMessage, active, messages, showChats, setShowChats, group, message} = props
  const router = useRouter()
  const context = useContext(MyContext) as {user:[undefined | user, React.Dispatch<React.SetStateAction<undefined | user>>]}
  
  const [modal, setModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const bottom = useRef<null | HTMLDivElement>(null)
  
  
  useEffect(()=>{
    console.log("context in chat container", context)
    console.log("Active", active)
    if(bottom.current){
    bottom.current.scrollTop = bottom.current.scrollHeight
    }
  }, [messages])

  const handleModal = ()=>{
    if(active || group){
      setModal(true)
    }
  }

  const handleDeleteGroup = (group:group) => {
    if(group){
      deleteGroup(group.groupid)
      .then((res:string) => {
        if(res){
          setModal(false)
          toast.success(res)
          router.reload()
        }
      })
      .catch((err:any)=>{
        toast.error(err)
      })
    }
    
  }

  return (
    <>
     <div className="w-full relative h-full  md:pb-0 flex flex-col">
        <div  className="border-b border-slate-300 px-3 py-4 dark:border-slate-600 flex items-center relative">
          <Image onClick={handleModal} src={(active && active.avatar) || (group && group.groupavatar ) || "/img/user.svg"} layout="intrinsic" width={30} height={30} className="cursor-pointer rounded-full pr-3" />
          <div className="pl-4">
            <p className="w-40 overflow-hidden text-ellipsis">{(active && active.username) || (group && group.groupname) || message}</p>
            {active && active.description && 
              <p className="w-40 overflow-hidden whitespace-nowrap text-xs text-slate-400 text-ellipsis">{active.description}</p>
            }
          </div>
          
          <div onClick={()=>setShowChats(!showChats)} className={`bg-slate-400 cursor-pointer p-2 rounded-full absolute right-3 top-4 md:hidden dark:bg-slate-700`}>
            {showChats ?
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle fill" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
            </svg>}
          </div>
        </div>
        <div ref={bottom} className="moz-scroll h-full p-2 mb-40 relative overflow-y-scroll md:mb-20">
          {(active || group) && messages.length > 0 ? messages.map((data, i)=>{
            let time = typeof data.time === "string" ? parseInt(data.time) : data.time
            return (<p key={i} className={`flex my-1 flex-col  ${context.user[0] && data.senderid === context.user[0].id ? "items-end" : "items-start"}`}>
                    {data.username && <span className={`text-slate-500 text-xs mx-1`}>{data.username}</span>}
                    <span className={`p-2 max-w-lg rounded-lg text-slate-900 ${context.user[0] && data.senderid === context.user[0].id ? "bg-indigo-600 dark:bg-indigo-900 rounded-br-none" : "bg-indigo-300 dark:bg-indigo-500 rounded-bl-none"} dark:text-slate-50`}>{data.content}</span>
                    <span className={`text-slate-500 text-xs`}>{`${String(new Date(time).getHours()).padStart(2, "0")}:${String(new Date(time).getMinutes()).padStart(2, "0")}`}</span>
                  </p>)
          })
        : (active || group) ?
          <div className="h-full w-full flex justify-center items-center">
            <p>Be the first to send a message</p>
          </div>
          :
          <></>
        }
        
        </div>
        {(active || group) &&
        <Messenger sendMessage={handleMyMessage} />
        }
      </div>
      <Modal isOpen={modal} setOpen={setModal}>
        <div className="flex flex-col items-center p-2">
          <h2 className="font-bold text-2xl">{active ? "USER PROFILE" : "GROUP INFO"}</h2>
          <div className="relative w-48 h-48 m-2 border rounded-full">
            <a target="_blank" href={(active && active.avatar) || (group && group.groupavatar)}>
            <Image layout="fill" src={(active && active.avatar) || (group && group.groupavatar ) || "/img/user.svg"} className="rounded-full border object-cover" />
            </a>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="font-bold">
            {(active && active.username) || (group && group.groupname)}
            </h2>
            {active && active.description && <p className="">{active.description}</p>}
            {group && group.interests && <p className="my-5 flex flex-wrap">{JSON.parse(group.interests).map((el:string, i:number)=><span key={i} className="m-1 px-2 py-1 rounded-full bg-indigo-500 mx-1">{el}</span>)}</p>}
          </div>
          {group && context.user[0]?.id.toString() === group.groupowner.toString() && 
            <div className="my-8 ">
              
              {confirm ? 
              <div>
                <h2 className="text-center my-10">Delete group?</h2>
                <div className="flex justify-evenly">
                  <button onClick={()=>handleDeleteGroup(group)} type="button" className="bg-green-600 mx-1 p-3 w-20 flex justify-center rounded-lg cursor-pointer outline-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                  </button>
                  <button onClick={()=>setConfirm(false)} type="button" className="bg-red-600 mx-1 p-3 w-20 flex justify-center rounded-lg cursor-pointer outline-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                </div>
                </div>
              :
                <div>
                  
                  <button type="button" className="p-3 outline-0 rounded-full bg-red-500 shadow shadow-slate-500 dark:shadow-slate-800" onClick={()=>setConfirm(true)}>Delete Group?</button>
                </div>
              }
            </div>}
        </div>
      </Modal>
    </>
  )
}

export default ChatContainer