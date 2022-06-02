import {useEffect} from "react"
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import {useRouter} from "next/router"
import styles from '../styles/Home.module.css'
import axios from "axios"
import style from "../styles/scss/home.module.scss"
import Container from "../components/Container"
import {trial} from "../utilities/requests"


const Home: NextPage = () => {
  
  useEffect(()=>{
    trial()
    console.log(process.env.NEXT_PUBLIC_SERVER)
  }, [])
  return (
    <>
      <div >
        <div className={`h-screen ${style.landing_bg}`}>
          <div className={`flex z-10 absolute top-0 right-0 justify-start w-screen items-center mr-2 py-2 lg:px-40`}>
              <Image  src="/img/LOGO.png" layout="intrinsic" className="p-0 m-0" width={80} height={80} />
              
          </div>
          <div className={` p-2 ${style.glass} flex flex-col items-center justify-center shadow c-container-sm lg:py-20 rounded`}>
            <div className={style.illustration}>
              <Image src="/img/cacophone5-bg.png" layout="fill" /> 
            </div>
            <div className="mt-5">
              <h2 className="font-bold text-4xl lg:text-6xl">Connect, Correspond and Grow.</h2>
              <p className="font-sm lg:text-2xl">Build connections with other interesting cacophoners.</p>
            </div>
            <div className={`text-slate-800 font-extrabold flex justify-center mt-5`} >
              <Link href="/login"><a className={`border border-white mr-5 c-btn`} >Login</a></Link>
              <Link href="/register"><a className={`c-btn bg-indigo-700 `}>Sign Up</a></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
