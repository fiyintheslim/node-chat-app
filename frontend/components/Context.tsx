import React, {createContext, useState} from 'react'
export const MyContext = createContext({})
interface user {
  username:string,
  email:string,
  avatar:string,
  avatar_public_id:string
}
const Context:React.FC = ({children}) => {
  const user = useState<user | {}>({})
  return (
    <MyContext.Provider value={user}>
    {children}
    </MyContext.Provider>
  )
}

export default Context