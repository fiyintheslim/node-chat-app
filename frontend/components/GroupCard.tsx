import {useContext, Dispatch, SetStateAction} from 'react'
import Image from "next/image"
import {group, user} from "../utilities/types"
import {MyContext} from "./Context";


interface Props {
    group:group,
    join:(value: group)=> void;
    member:group | undefined;
}
const GroupCard = (props:Props) => {
    const {group, join, member} = props;
    const context = useContext(MyContext) as {user: [undefined | user, Dispatch<SetStateAction<undefined | user>>]}
    console.log("member", member, context.user[0]?.id)
    const {groupname, groupavatar, interests, groupowner} = group
  return (
        <div onClick={()=>join(group)} className="relative h-60 text-slate-100 m-1 block cursor-pointer ">
            <Image src={groupavatar ? groupavatar : "/img/user.svg"} layout="fill" className="object-cover absolute left-0 top-0 w-full h-full z-0 rounded-xl"  />
            <div  className="z-10 opacity-40 bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 w-full h-full rounded-xl shadow-md"></div>
            <p className="z-20 inline absolute top-2 left-2 text-xl font-bold">{groupname}</p>
            <p className="z-20 inline absolute bottom-2 left-2 text-xl font-bold">{
            member ? 
              parseInt(member.groupowner) ===  context.user[0]?.id ? 
                "Owner" 
                : 
                "Member" 
              :
               ""}</p>
            <p className={`z-20 inline absolute p-2 bottom-2 right-2 h-9 text-center shadow-inner font-extrabold w-68 overflow-x-scroll`}>
            {JSON.parse(interests).map((int:string)=><span className="bg-slate-300 px-2 mx-1 py-1 rounded-full text-slate-600 text-xs">{int}</span>)} 
            </p>
        </div>
  )
}

export default GroupCard