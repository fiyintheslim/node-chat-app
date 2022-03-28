import {useContext} from 'react'
import Link from "next/link"
import Image from "next/image"
import {user} from "../utilities/types"

type Prop = {
    user:user,
    online:boolean | undefined,
}

const Card = (props:Prop) => {
    const {user, online} = props
    
  return (
    <Link href={`/app/chats?id=${user.id}`} >
        <div className="relative h-60 text-slate-100 m-1 block cursor-pointer rounded-xl shadow-lg">
            <Image src={user.avatar ? user.avatar : "/img/user.svg"} layout="fill" className="object-cover absolute left-0 top-0 w-full h-full z-0 rounded-xl "  />
            <div  className="z-10 opacity-40 bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 w-full h-full rounded-xl "></div>
            <p className="z-20 inline absolute top-2 left-2 text-xl font-bold">{user.username}</p>
            <p className={`z-20 inline absolute p-2 bottom-2 right-2 opacity-75  h-9 text-center font-extrabold flex items-center`}>
              <span className={`z-20 mr-1 block w-3 h-3 ${online ? 'bg-green-400': 'bg-slate-600'} rounded-full`}></span>
              <span>{online && online ? 'Online' : 'Offline'}</span>
            </p>
        </div>
    </Link>
  )
}

export default Card