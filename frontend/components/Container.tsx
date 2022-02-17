import React, {useEffect, useContext, Context} from 'react';
import Header from "./Header";
import {MyContext} from "./Context"

interface context extends Context<{dark:boolean}>{ dark:boolean}

const Container: React.FC = ({children}) => {
  const dark = useContext(MyContext)
  useEffect(()=>{console.log("dark", dark)}, [])
  return (
    <div className={`bg-slate-100 h-screen`}>
        <Header />
        {children}
    </div>
  )
}

export default Container