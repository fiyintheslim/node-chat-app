import React from 'react'
import Image from "next/image"
import {group} from "../utilities/types"


interface Props {
    group:group
}
const GroupCard = (props:Props) => {
    const {groupname, groupavatar, interests} = props.group
  return (
    <div>
        <div className="relative h-60 text-slate-100 m-1 block cursor-pointer shadow-md">
            <Image src={groupavatar ? groupavatar : "/img/user.svg"} layout="fill" className="object-cover absolute left-0 top-0 w-full h-full z-0 rounded-lg"  />
            <div  className="z-10 opacity-40 bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 w-full h-full rounded-lg"></div>
            <p className="z-20 inline absolute top-2 left-2 text-xl font-bold">{groupname}</p>
            <p className={`z-20 inline absolute p-2 bottom-2 right-2 h-9 text-center shadow-inner font-extrabold w-68 overflow-x-scroll`}>
            {JSON.parse(interests).map((int:string)=><span className="bg-slate-300 px-2 mx-1 py-1 rounded-full">{int}</span>)} 
            </p>
        </div>
    </div>
  )
}

export default GroupCard