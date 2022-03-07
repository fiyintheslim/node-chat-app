import {createContext, useState, useEffect, FC} from 'react'
import {user} from "../utilities/types"
import socketClient, {Socket} from "socket.io-client"
export const MyContext = createContext({})


const Context:FC = ({children}) => {
  const user = useState<user | undefined >()
  const [socket, setSocket] = useState<Socket | undefined>(undefined)
  useEffect(()=>{
    const io = socketClient(process.env.NEXT_PUBLIC_SERVER as string)
    setSocket(io)
  }, [])
  return (
    <MyContext.Provider value={{user, socket}}>
    {children}
    </MyContext.Provider>
  )
}

export default Context