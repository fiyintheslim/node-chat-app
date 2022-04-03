import {useContext, Dispatch, SetStateAction, useEffect, useState} from 'react'
import {useRouter} from "next/router"
import Image from "next/image"
import Chart from "../../components/Chart"
import Navigation from "../../components/Navigation"
import Container from "../../components/Container"
import {MyContext} from "../../components/Context"
import {user, group} from "../../utilities/types"
import Modal from "../../components/Modal"
import UpdateDescription from "../../components/updateDescription"
import Warning from "../../components/Warning";
import {me, getMyCreatedGroups} from "../../utilities/requests"

const Profile = () => {
  const router = useRouter();
  const context = useContext(MyContext) as {user: [undefined | user, Dispatch<SetStateAction<undefined | user>>]}
  const meContext = context.user[0] 

  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [which, setWhich] = useState<string | undefined>(undefined)
  const [myGroups, setMyGroups] = useState<group[]>([])
 
  useEffect(()=>{
    me(context.user, router)
    getMyCreatedGroups()
    .then((res)=>{
      setMyGroups(res)
    })
  }, [loading, meContext])

  const logOut = ()=>{
    localStorage.removeItem("token")
    context.user[1](undefined)
  }
 
  return (
    
    <Container>
      {meContext ?
      (<div className="h-full overflow-y-scroll pb-24 md:pb-0 moz-scroll">
        <p className="text-2xl my-4 mx-3 font-bold">My Account</p>
        <div className=" shadow relative flex flex-col justify-center items-center p-3 m-3 rounded-xl bg-slate-200 md:flex-row  md:justify-start dark:bg-slate-800">
          <div className="w-60 h-60 rounded-full relative md:w-96 md:mr-10">
            <a target="_blank" href={meContext.avatar} >
              <Image src={meContext.avatar} layout="fill" className="rounded-full object-cover" />
            </a>
          </div>
          <div className="flex flex-col justify-between py-2 w-full relative">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-xs opacity-40 text-extrabold">Username</p>
              <p className="block text-xl my-2">{meContext.username}</p>
            </div>
            <div className="flex flex-col items-center w-full md:items-start">
              {meContext.description &&
              <>
                <p className="text-xs opacity-40 text-extrabold">Description</p>
                <p className="block">{meContext.description}</p>
              </>
              }
              <svg onClick={()=>{
                setModal(true)
                setWhich("descr")
              }
                } xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill absolute cursor-pointer h-6 w-6 p-1 right-0 top-0 z-50 rounded-full border border-slate-400 dark:border-slate-600" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className='shadow p-3 m-3 rounded-xl bg-slate-200 dark:bg-slate-800'>
          <h2 className="text-2xl my-4 mx-3 font-bold">Activities</h2>
          <div>
              <Chart /> 
          </div>
        </div>
        <div className='shadow my-group-cont relative py-3 m-3 rounded-xl bg-slate-200 dark:bg-slate-800'>
          <h2 className="text-2xl px-3 my-4 mx-3 font-bold">My Groups</h2>
          {myGroups.length > 0 ?
          <div className="px-2 h-96 overflow-y-scroll relative bg-slate-300 rounded shadow-inner shadow-slate-200 grid justify-items-center md:grid-cols-4 2xl:grid-cols-6 dark:bg-slate-600">
            {myGroups.map((group:group)=>(
              <div title={group.groupname} className="rounded-full p-3 w-56 h-56 relative m-2 flex justify-center items-center cursor-pointer shadow shadow-slate-500 dark:shadow-slate-800 ">
                <div className="w-full h-full rounded-full bg-slate-800 opacity-25 absolute top-0 left-0 z-10"></div>
                <Image src={group.groupavatar} layout="fill" className="object-cover rounded-full" />
                <p className="z-20 relative text-lg font-bold text-slate-50 w-48 text-center overflow-hidden text-ellipsis">{group.groupname}</p>
              </div>
              )
            )}
          </div> 
          :
          <div className="flex justify-center items-center h-96">
            <p className="font-thin text-lg md:text-3xl">Groups you create appear here</p>
          </div>}
        </div>
        <div className="shadow flex justify-center p-3 m-3 rounded-xl bg-slate-200 dark:bg-slate-800">
          <div className="flex justify-evenly w-80">
          <button onClick={()=>{logOut()}} type="button" className="outline-none flex rounded bg-orange-500 p-3 items-center cursor-pointer shadow shadow-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-closed-fill mr-2" viewBox="0 0 16 16">
              <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            <span>Logout</span>
          </button>
          <button onClick={()=>{
            setModal(true)
            setWhich("delete")
          }} type="button" className="outline-none flex rounded bg-red-700 p-3 items-center cursor-pointer shadow shadow-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill mr-2" viewBox="0 0 16 16">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
            </svg>
            <span>Delete Account</span>
          </button>
          </div>
        </div>
      
      </div>)
      :
        (<div className="h-full flex items-center justify-center">Loading profile...</div>)
      }
      <Modal isOpen={modal} setOpen={setModal} >
        {which === "descr" && 
          <UpdateDescription loading={loading} setLoading={setLoading} setModal={setModal} />
        }
        {which === "delete" && 
          <Warning />
        }
      </Modal>
    </Container>
  )
}

export default Profile