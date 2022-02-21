import {useEffect} from "react"
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios"
import style from "../styles/scss/home.module.scss"
import Container from "../components/Container" 

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
        <div className="c-container-sm c-container-lg u-dark">
          <p className={`flex flex-wrap py-10`}>
            <span className={`text-4xl lg:text-6xl font-extrabold flex flex-wrap`}>Connect, Correspond and Grow.</span> <span>Build connections with other interesting cacophoners.</span>
          </p>
          <div className={`h-full`}>
            <Image className="rounded" layout="intrinsic" height={500} width={500} src="/img/cacophone5.jpg" />
          </div>
        </div>
        <div className={`ill-bg ${style.ill_bg} h-96`}></div>
      </div>
    </Container>
    </>
  )
}

export default Home
