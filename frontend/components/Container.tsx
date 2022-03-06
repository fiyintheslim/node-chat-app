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
  const context = useContext(MyContext) as {user: [{} | user, React.Dispatch<React.SetStateAction<{} | user>>]}
  const meContext = context.user[0] !== {} ? context.user[0] as user : {avatar:""};

  useEffect(()=>{
    console.log("context in container", context)
    me(context.user, router)
  }, [])

  return (
    <>
      <Header />
      <div className="min-h-screen pb-20 md:pb-0 relative md:flex md:flex-row-reverse">
        <div className="min-h-full grow md: md:ml-24 p-2">
        {children}
        </div>
        <Navigation avatar={meContext.avatar} />
      </div>
    </>
  )
}

export default Container