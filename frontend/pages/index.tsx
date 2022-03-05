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


const Home: NextPage = () => {
  
  useEffect(()=>{
    console.log(process.env.NEXT_PUBLIC_SERVER)
  }, [])
  return (
    <>
      <div >
        <div className={`h-screen ${style.landing_bg}`}>
          <div className={` flex justify-between items-center mr-2 py-2 lg:px-40`}>
              <Image  src="/img/LOGO.png" layout="intrinsic" className="p-0 m-0" width={80} height={80} />
              <div className={`text-slate-800 font-extrabold flex justify-evenly`} >
              <Link href="/login"><a className={`border border-white mr-5 c-btn`} >Login</a></Link>
              <Link href="/register"><a className={`c-btn bg-indigo-700 `}>Sign Up</a></Link>
              </div>
          </div>
          <div className={`m-2 p-2 ${style.glass} flex justify-evenly lg:justify-center shadow c-container-sm lg:flex-row lg:items-center lg:mx-40 lg:py-20 rounded`}>
            <div>
              <h2 className="font-bold text-4xl lg:text-6xl">The ultimate communication platform.</h2>
            </div>
          </div>
        </div>
        <div className="c-container-sm c-container-lg u-dark h-screen bg-white">
          <p className={`flex flex-wrap py-10`}>
            <span className={`text-4xl lg:text-6xl font-extrabold flex flex-wrap`}>Connect, Correspond and Grow.</span> <span className="font-sm lg:text-2xl">Build connections with other interesting cacophoners.</span>
          </p>
          <div className={`h-full flex items-center`}>
            <Image className="rounded" layout="intrinsic" height={500} width={500} src="/img/cacophone5-bg.png" />
          </div>
        </div>
        <div className={`ill-bg ${style.ill_bg} h-96`}>
          <div>
            <Image layout="intrinsic" width={500} height={500} className="rounded" src="/img" />
          </div>
          <p></p>
        </div>
      </div>
    </>
  )
}

export default Home
