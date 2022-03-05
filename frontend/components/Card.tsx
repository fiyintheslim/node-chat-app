import React from 'react'
import Link from "next/link"
import Image from "next/image"
import {user} from "../utilities/types"

type Prop = {
    user:user
}

const Card = (props:Prop) => {
    const {user} = props
  return (
    <Link href={`/app/chat/${user.id}`} >
        <div className="relative h-60 text-slate-100 m-1 block cursor-pointer">
            <Image src={user.avatar ? user.avatar : "/img/user.svg"} layout="fill" className="object-cover absolute left-0 top-0 w-full h-full z-0 rounded-md"  />
            <div  className="z-20 opacity-40 bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 w-full h-full rounded-md"></div>
            <p className="z-30 inline absolute top-1 left-1">{user.username}</p>
        </div>
    </Link>
  )
}

export default Card