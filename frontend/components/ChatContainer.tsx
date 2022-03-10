import React, {useEffect, useContext, useState, Context} from 'react';
import {useRouter} from "next/router";
import Header from "./Header";
import {MyContext} from "./Context"
import Navigation from "./Navigation"
import Messenger from "./Messenger"
import {me} from "../utilities/requests"
import {user} from "../utilities/types"




const Container: React.FC = ({children}) => {
  const router = useRouter()
  const context = useContext(MyContext) as {user:[undefined | user, React.Dispatch<React.SetStateAction<undefined | user>>]}
  
  const [activeChat, setActiveChat] = useState<undefined | user>(undefined)
  
  useEffect(()=>{
    console.log("context in chat container", context)
    me(context.user, router)
  }, [])

  return (
    <>
      <div className="grow relative min-h-screen m-1 md:mx-10 md:pb-0 flex flex-col">
        <div className="min-h-full grow p-2">
        {children}
        </div>
        <Messenger /> 
      </div>
    </>
  )
}

export default Container