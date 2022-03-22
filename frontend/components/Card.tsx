import {useContext} from 'react'
import Link from "next/link"
import Image from "next/image"
import {user} from "../utilities/types"

type Prop = {
    user:user,
    online:boolean | undefined
}

const Card = (props:Prop) => {
    const {user, online} = props
    
  return (
    <Link href={`/app/chats?id=${user.id}`} >
        <div className="relative h-60 text-slate-100 m-1 block cursor-pointer">
            <Image src={user.avatar ? user.avatar : "/img/user.svg"} layout="fill" className="object-cover absolute left-0 top-0 w-full h-full z-0 rounded-md"  />
            <div  className="z-10 opacity-40 bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 w-full h-full rounded-md"></div>
            <p className="z-20 inline absolute top-1 left-1">{user.username}</p>
            <p className={`z-20 inline absolute p-2 bottom-2 right-2 opacity-75 ${online ? 'bg-green-400 text-green-900': 'bg-red-400 text-red-900'} rounded-full h-9 w-20 text-center font-extrabold`}>
            {online ? 'online' : 'offline'}  
            </p>
        </div>
    </Link>
  )
}

export default Card