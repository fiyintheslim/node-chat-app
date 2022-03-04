import '../styles/globals.css';
import {GetServerSideProps} from "next"
import type { AppProps } from 'next/app';
import socketClient from "socket.io-client"
import React, {useEffect, useState, useRef} from "react"
import Context from '../components/Context'
import style from "../styles/scss/general.module.scss"



function MyApp({ Component, pageProps }: AppProps) {
  
  const [darkMode, setDarkMode] = useState<boolean | undefined>(false)
  const inp = useRef<null | HTMLInputElement>(null)
  const setDark = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setDarkMode(e.target.checked)
    if(e.target.checked){
      window.localStorage.setItem("dark", "no")
      document.documentElement.classList.remove("dark")
    }else{
      window.localStorage.setItem("dark", "yes")
      document.documentElement.classList.add("dark")
    }
    
  }

  const getDark = () => {
    const dark = window.localStorage.getItem("dark");
    console.log(dark)
    if(dark === "yes"){
      document.documentElement.classList.add("dark")
      setDarkMode(false)
    }else {
      document.documentElement.classList.remove("dark")
      setDarkMode(true)
    }
  }

  useEffect(()=>{
   getDark()
   const socket = socketClient(process.env.NEXT_PUBLIC_SOCKET_SERVER as string)

  }, [])
  return(
    <Context>
      <div style={{padding:"0px", margin:"0px"}} className="dark:bg-slate-900 bg-slate-100 min-h-screen u-dark">
        <Component {...pageProps} />
        <div className="fixed bottom-1 right-2">
        <input checked={darkMode} type="checkbox" id="mode-switch" onChange={(e)=>{
          setDark(e)
          }} ref={inp} className={`${style.mode_switch}`} />
          <label htmlFor="mode-switch" className={`${style.mode_label}`}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{position:"relative", right:"5px"}} width="16" height="16" fill="currentColor" className="bi bi-brightness-high-fill" viewBox="0 0 16 16">
              <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" style={{fill:"white", position:"relative", left:"5px"}} width="16" height="16" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
            </svg>
          </label>
        </div>
      </div>
    </Context>
  )
}


export default MyApp
