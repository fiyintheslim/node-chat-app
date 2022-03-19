import {useContext, Dispatch, SetStateAction, useEffect} from 'react'
import {useRouter} from "next/router"
import Image from "next/image"
import Navigation from "../../components/Navigation"
import Container from "../../components/Container"
import {MyContext} from "../../components/Context"
import {user} from "../../utilities/types"

const Profile = () => {
  const router = useRouter();
  const context = useContext(MyContext) as {user: [undefined | user, Dispatch<SetStateAction<undefined | user>>]}
  const meContext = context.user[0] 
 
  useEffect(()=>{
    if(!meContext){
    
    }
  }, [])

  return (
    
    <Container>
      {meContext ?
      (<div>
        <p className="text-2xl my-4 mx-3 font-bold">My Account</p>
        <div className="flex flex-col justify-center items-center p-3 m-3 rounded-xl bg-slate-300 dark:bg-slate-800">
          <div className="w-60 h-60 rounded-full relative ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill absolute" viewBox="0 0 16 16">
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
            </svg>
            <a target="_blank" href={meContext.avatar} >
            <Image src={meContext.avatar} layout="fill" className="rounded-full " />
            </a>
          </div>
          <p className="text-xl my-2">{meContext.username}</p>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
        <div className="flex justify-evenly">
          <button type="button" className="flex rounded bg-orange-500 p-3 items-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-closed-fill mr-2" viewBox="0 0 16 16">
              <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            <span>Logout</span>
          </button>
          <button type="button" className="flex rounded bg-red-700 p-3 items-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill mr-2" viewBox="0 0 16 16">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
            </svg>
            <span>Delete Account</span>
          </button>
        </div>
      
      </div>)
      :
        (<div>Login to view</div>)
      }
    </Container>
  )
}

export default Profile