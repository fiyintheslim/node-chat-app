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
        <div onClick={()=>join(group)} className="relative h-60 text-slate-100 m-1 block cursor-pointer overflow-hidden">
            <Image src={groupavatar ? groupavatar : "/img/user.svg"} layout="fill" className="object-cover absolute left-0 top-0 w-full h-full z-0 rounded-xl"  />
            <div  className="z-10 opacity-40 bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 w-full h-full rounded-xl shadow-md"></div>
            <p className="z-20 inline absolute top-2 left-2 text-xl font-bold">{groupname}</p>
            <p className="z-20 inline absolute top-2 right-2 text-xl font-bold flex items-center">{
            member ? 
              parseInt(member.groupowner) ===  context.user[0]?.id ? 
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-star mr-1" viewBox="0 0 16 16">
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                </svg>
                <span className="font-thin text-base">Owner</span>
                </>
                : 
                <>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people mr-1" viewBox="0 0 16 16">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg>
                <span className="font-thin text-base">Member</span>
                </>
              :
               ""}</p>
            <p className={`z-20 inline absolute p-2 bottom-2 left-1 shadow-inner font-extrabold w-64 overflow-x-scroll moz-scroll-none shadow-inner flex justify-start`}>
            {JSON.parse(interests).map((int:string)=><span className="bg-slate-300 px-2 m-1 py-1 rounded-full text-slate-600 text-xs">{int}</span>)} 
            </p>
        </div>
  )
}

export default GroupCard