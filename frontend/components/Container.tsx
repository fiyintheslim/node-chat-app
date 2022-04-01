import React, {useEffect, useContext, useState, Dispatch, SetStateAction} from 'react';
import {Socket} from "socket.io-client"
import {useRouter} from "next/router";
import Header from "./Header";
import {MyContext} from "./Context"
import Navigation from "./Navigation"
import Messenger from "./Messenger"
import socket from "../utilities/socket"
import {me, saveSessionID, getMyGroups} from "../utilities/requests"
import {user, loggedIn, group} from "../utilities/types"




const Container: React.FC = ({children}) => {
  const router = useRouter()
  const context = useContext(MyContext) as {user: [undefined | user, Dispatch<SetStateAction<undefined | user>>], socket:[Socket | undefined, Dispatch<SetStateAction<Socket> | undefined>], loggedIn:[loggedIn[] | undefined, Dispatch<SetStateAction<loggedIn[] | undefined>>]}
  const meContext = context.user[0] 
 
  
  useEffect(()=>{
    me(context.user, router, socket)
    
    if(meContext && meContext.username){
      let sessionID = localStorage.getItem("socketSession")
      
      if(meContext.socketsessionid && sessionID !== meContext.socketsessionid){
        localStorage.setItem("socketSession", meContext.socketsessionid)
      }

      socket.auth = sessionID == null ? {username:meContext.username, userID:meContext.id} : {username:meContext.username, userID:meContext.id, sessionID}
      socket.connect();
      
    }
    
    
  }, [meContext, context.loggedIn[0]])

  useEffect(()=>{
    socket.on("user_connected", (data)=>{
      
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
      
      const socketSession = localStorage.getItem("socketSession")
      
      if(data && socketSession === null || socketSession === 'null'){
        localStorage.setItem("socketSession", data)
      }
      //console.log("Me context in socket session", meContext.sessionID)
      if(meContext && meContext.id && !meContext.socketsessionid){
        
        saveSessionID(data)
      }
    })

    
  }, [meContext])
  

  return (
    <>
      <Header />
      <div className="h-screen overflow-hidden pt-20 md:pb-0 relative md:flex md:flex-row-reverse">
        <div className="h-full w-full md:ml-24">
        {children}
        </div>
        <Navigation avatar={meContext && meContext.avatar}  />
      </div>
      
    </>
  )
}

export default Container