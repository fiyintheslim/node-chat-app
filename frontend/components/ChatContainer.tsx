import React, {useEffect, useContext, Context} from 'react';
import {useRouter} from "next/router";
import Header from "./Header";
import {MyContext} from "./Context"
import Navigation from "./Navigation"
import Messenger from "./Messenger"
import {me} from "../utilities/requests"
import {user} from "../utilities/types"



const Container: React.FC = ({children}) => {
  const router = useRouter()
  const context = useContext(MyContext) as [{} | user, React.Dispatch<React.SetStateAction<{} | user>>]
  const meContext = context[0] !== {} ? context[0] as user : {avatar:""};
  const chatRGX = /\/chat\//
  useEffect(()=>{
    console.log("context in chat container", context)
    me(context, router)
  }, [])

  return (
    <>
      <Header />
      <div className="min-h-screen mx-20 md:pb-0 relative flex flex-col">
        <div className="min-h-full grow p-2">
        {children}
        </div>
        <Messenger /> 
      </div>
    </>
  )
}

export default Container