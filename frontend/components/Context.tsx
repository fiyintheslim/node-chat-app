import {createContext, useState, useEffect, FC} from 'react'
import {user} from "../utilities/types"
export const MyContext = createContext({})


const Context:FC = ({children}) => {
  const user = useState<user | {} >({})
  useEffect(()=>{
    console.log("Context state", user[0])
  }, [user[0]])
  return (
    <MyContext.Provider value={user}>
    {children}
    </MyContext.Provider>
  )
}

export default Context