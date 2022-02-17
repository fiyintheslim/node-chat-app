import React, {createContext, useState} from 'react'
export const MyContext = React.createContext({})

const Context:React.FC = ({children}) => {
  return (
    <MyContext.Provider value={{dark:false}}>
    {children}
    </MyContext.Provider>
  )
}

export default Context