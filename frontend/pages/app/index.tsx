import React, {useEffect, useState, useContext, Dispatch, SetStateAction} from 'react'
import Link from "next/link"
import Image from "next/image"
import Container from "../../components/Container"
import {getUsers} from "../../utilities/requests"
import {user, loggedIn} from "../../utilities/types"
import Card from "../../components/Card"
import {MyContext} from "../../components/Context"


const Home = () => {
  const context = useContext(MyContext) as {loggedIn : [loggedIn[] | undefined, Dispatch<SetStateAction<loggedIn[] | undefined>>]}
  // const { toasts, handlers } = useToaster();
  
  const [users, setUsers] = useState<undefined | user[]>(undefined)
  const [loggedIn, setLoggedIn] = useState<number[] | undefined>(undefined)

  useEffect(()=>{
    if(context.loggedIn[0]){
      console.log("Online", context.loggedIn[0])
      const ids = context.loggedIn[0].map(user=>user.userID)
      console.log("array of id's", ids)
      setLoggedIn(ids)
    }
  }, [context.loggedIn[0]])

  useEffect(()=>{
    getUsers(setUsers)
  }, [])

  useEffect(()=>{}, [loggedIn])
  
  return (
      <Container>
        <ul className="overflow-y-scroll pb-24 h-full flex flex-col justify-start md:pt-1">
        {users && users.map(user=>(
          <li key={user.id} className="">
            <Card user={user} online={loggedIn?.includes(user.id)}  />
          </li>
          )
          )}
        </ul>
        {/* {toasts
        .filter((toast) => toast.visible)
        .map((toast) => (
          <div key={toast.id} {...toast.ariaProps}>
            {toast.message}
          </div>
        ))} */}
        {/* <Toaster /> */}
      </Container>
  )
}

export default Home