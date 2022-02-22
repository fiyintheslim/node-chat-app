import {useEffect} from "react"
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios"
import style from "../styles/scss/home.module.scss"
import Container from "../components/Container"
import Header from "../components/Header"; 

const Home: NextPage = () => {
  const test = async ()=>{
    // const res = await axios.get("/login");
    // console.log(res.data)
  }
  useEffect(()=>{
    test()
  }, [])
  return (
    <>
    <Container>
      <div>
        <div className={`h-screen ${style.landing_bg}`}>
        <Header />
        <div className={`m-2 p-2 ${style.glass} flex justify-evenly lg:justify-center shadow c-container-sm lg:flex-row lg:items-center mx-40 py-20 rounded`}>
          <Image src="/img/cacophone1.gif" layout="intrinsic" width={300} height={300} className="rounded z-10" />
          <p className="z-10">Hello</p>
        </div>
        </div>
        <div className="c-container-sm c-container-lg u-dark h-screen bg-white">
          <p className={`flex flex-wrap py-10`}>
            <span className={`text-4xl lg:text-6xl font-extrabold flex flex-wrap`}>Connect, Correspond and Grow.</span> <span>Build connections with other interesting cacophoners.</span>
          </p>
          <div className={`h-full flex items-center`}>
            <Image className="rounded" layout="intrinsic" height={500} width={500} src="/img/cacophone5.jpg" />
          </div>
        </div>
        <div className={`ill-bg ${style.ill_bg} h-96`}>
          <div>
            <Image layout="intrinsic" width={500} height={500} className="rounded" src="/img" />
          </div>
          <p></p>
        </div>
      </div>
    </Container>
    </>
  )
}

export default Home
