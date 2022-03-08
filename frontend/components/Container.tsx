import React, {useEffect, useContext, Context} from 'react';
import {Socket} from "socket.io-client"
import {useRouter} from "next/router";
import Header from "./Header";
import {MyContext} from "./Context"
import Navigation from "./Navigation"
import Messenger from "./Messenger"
import socket from "../utilities/socket"
import {me} from "../utilities/requests"
import {user} from "../utilities/types"



const Container: React.FC = ({children}) => {
  const router = useRouter()
  const context = useContext(MyContext) as {user: [undefined | user, React.Dispatch<React.SetStateAction<undefined | user>>], socket:[Socket | undefined, React.Dispatch<React.SetStateAction<Socket> | undefined>]}
  const meContext = context.user[0] ? context.user[0] as user : {avatar:"", username:undefined};

  useEffect(()=>{
    me(context.user, router)
    console.log("context in container", context)
    if(meContext.username){
      socket.auth = {username:meContext.username}
      const connectedSocket = socket.connect();
      console.log("Connected socket", connectedSocket)
    }
    
    
  }, [meContext])

  return (
    <>
      <Header />
      <div className="min-h-screen pb-20 md:pb-0 relative md:flex md:flex-row-reverse">
        <div className="min-h-full grow md: md:ml-24 p-2">
        {children}
        </div>
        <Navigation avatar={meContext.avatar} />
      </div>
    </>
  )
}

export default Container