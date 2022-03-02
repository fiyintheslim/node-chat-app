import React, {createContext, useState} from 'react'
import {user} from "../utilities/types"
export const MyContext = createContext({})


const Context:React.FC = ({children}) => {
  const user = useState<user | {} >({})

  return (
    <MyContext.Provider value={user}>
    {children}
    </MyContext.Provider>
  )
}

export default Context