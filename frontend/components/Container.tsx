import React, {useEffect, useContext, useState, Dispatch, SetStateAction} from 'react';
import {Socket} from "socket.io-client"
import {useRouter} from "next/router";
import Header from "./Header";
import {MyContext} from "./Context"
import Navigation from "./Navigation"
import Messenger from "./Messenger"
import socket from "../utilities/socket"
import {me, saveSessionID} from "../utilities/requests"
import {user, loggedIn} from "../utilities/types"



const Container: React.FC = ({children}) => {
  const router = useRouter()
  const context = useContext(MyContext) as {user: [undefined | user, Dispatch<SetStateAction<undefined | user>>], socket:[Socket | undefined, Dispatch<SetStateAction<Socket> | undefined>], loggedIn:[loggedIn[] | undefined, Dispatch<SetStateAction<loggedIn[] | undefined>>]}
  const meContext = context.user[0] ? context.user[0] as user : {avatar:"", username:undefined};
 
  
  useEffect(()=>{
    me(context.user, router)
    let sessionID = localStorage.getItem("socketSession")
    console.log("Seesion id", sessionID)
    if(meContext.username){
      socket.auth = sessionID == null ? {username:meContext.username, userID:meContext.id} : {username:meContext.username, userID:meContext.id, sessionID}
      const connectedSocket = socket.connect();
      console.log("session id", sessionID, context, connectedSocket)
    }
    
    
  }, [meContext, context.loggedIn[0]])

  useEffect(()=>{
    socket.on("user_connected", (data)=>{
      console.log(`${data.username} is online in container`)
      if(context.loggedIn){
        context.loggedIn[1](data)
      }
    })
  
    socket.on("users", (data)=>{
    
      if(!context.loggedIn[0]){
  
        context.loggedIn[1](data)
        console.log("Socket saved in context", data, context.loggedIn)
        
      }
    })
  
    
    socket.on("session", data=>{
      console.log("session ID", data)
      const socketSession = localStorage.getItem("socketSession")
      console.log("socketSession", socketSession)
      if(data && socketSession === null || socketSession === 'null'){
        localStorage.setItem("socketSession", data)
      }
      //console.log("Me context in socket session", meContext.sessionID)
      
    })
  }, [meContext])
  

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