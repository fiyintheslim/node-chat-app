import React, {useEffect, useState} from 'react'
import Link from "next/link"
import Image from "next/image"
import Container from "../../components/Container"
import {getUsers} from "../../utilities/requests"
import {user} from "../../utilities/types"
import Card from "../../components/Card"


const Home = () => {
  const [users, setUsers] = useState<undefined | user[]>(undefined)

  useEffect(()=>{
    getUsers(setUsers)
  }, [users])
  
  return (
      <Container>
        <ul className="flex flex-col justify-evenly">
        {users && users.map(user=>(
          <li key={user.id} className="">
            <Card user={user} />
          </li>
          )
          )}
        </ul>
      </Container>
  )
}

export default Home