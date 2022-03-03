import React, {useEffect, useContext, Context} from 'react';
import {useRouter} from "next/router";
import Header from "./Header";
import {MyContext} from "./Context"
import Navigation from "./Navigation"
import {me} from "../utilities/requests"
import {user} from "../utilities/types"



const Container: React.FC = ({children}) => {
  const router = useRouter()
  const context = useContext(MyContext) as [{} | user, React.Dispatch<React.SetStateAction<{} | user>>]
  const meContext = context[0] !== {} ? context[0] as user : {avatar:""};

  useEffect(()=>{
    me(context, router)
  }, [])

  return (
    <>
      <Header />
      <div className="h-screen pb-20 md:pb-0 relative md:flex md:flex-row-reverse">
        <div className="h-full  grow md:oveflow-y-auto md:ml-24">
        {children}
        </div>
        <Navigation avatar={meContext.avatar} />
      </div>
    </>
  )
}

export default Container