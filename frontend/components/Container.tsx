import React, {useEffect, useContext, Context} from 'react';
import Header from "./Header";
import {MyContext} from "./Context"

interface context extends Context<{dark:boolean}>{ dark:boolean}

const Container: React.FC = ({children}) => {
  const [dark, setDark] = useContext(MyContext)
  useEffect(()=>{console.log("dark", dark)}, [dark])
  return (
    <div onClick={() => {setDark(!dark)}} className={`dark:bg-slate-900 bg-slate-100 h-screen`}>
        <Header />
        {children}
        <div></div>
    </div>
  )
}

export default Container