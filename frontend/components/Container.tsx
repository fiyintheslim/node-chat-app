import React, {useEffect, useContext, useState, Dispatch, SetStateAction} from 'react';
import {Socket} from "socket.io-client"
import {useRouter} from "next/router";
import Header from "./Header";
import {MyContext} from "./Context"
import Navigation from "./Navigation"
import Messenger from "./Messenger"
import socket from "../utilities/socket"
import {me} from "../utilities/requests"
import {user, loggedIn} from "../utilities/types"



const Container: React.FC = ({children}) => {
  const router = useRouter()
  const context = useContext(MyContext) as {user: [undefined | user, Dispatch<SetStateAction<undefined | user>>], socket:[Socket | undefined, Dispatch<SetStateAction<Socket> | undefined>], loggedIn:[loggedIn[] | undefined, Dispatch<SetStateAction<loggedIn[] | undefined>>]}
  const meContext = context.user[0] ? context.user[0] as user : {avatar:"", username:undefined};
 
  socket.on("user_connected", (data)=>{
    console.log(`${data.username} is online`)
  })
  socket.on("user", (data)=>{
    console.log("users", data)
    if(context.loggedIn){
      context.loggedIn[1](data)
    }
    
    console.log(`User ${data.username} logged in`)
  })
  useEffect(()=>{
    me(context.user, router)
    
    console.log("context in container", context)
    if(meContext.username){
      socket.auth = {username:meContext.username, userID:meContext.id}
      const connectedSocket = socket.connect();
      console.log("Connected socket", connectedSocket)
    }
    
    
    
    
  }, [meContext, context.loggedIn[0]])

  return (
    <>
      <Header />
      <div className="min-h-screen pb-20 md:pb-0 relative md:flex md:flex-row-reverse">
        <div className="min-h-full grow md: md:ml-24">
        {children}
        </div>
        <Navigation avatar={meContext.avatar}  />
      </div>
    </>
  )
}

export default Container