import {createContext, useState, useEffect, FC} from 'react'
import {user} from "../utilities/types"
import socketClient, {Socket} from "socket.io-client"
import socket from "../utilities/socket"
export const MyContext = createContext({})


const Context:FC = ({children}) => {
  const user = useState<user | undefined>(undefined)
  const socket = useState<Socket | undefined>(undefined)
  useEffect(()=>{
    
  }, [])
  return (
    <MyContext.Provider value={{user, socket}}>
    {children}
    </MyContext.Provider>
  )
}

export default Context