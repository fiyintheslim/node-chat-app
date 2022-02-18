import React, {createContext, useState} from 'react'
export const MyContext = createContext<[boolean, (theme: boolean) => void]>([false, () => {}])

const Context:React.FC = ({children}) => {
  const dark = useState(false)
  return (
    <MyContext.Provider value={dark}>
    {children}
    </MyContext.Provider>
  )
}

export default Context