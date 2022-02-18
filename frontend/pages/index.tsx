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
        <div className="flex flex-col lg:flex-row bg-white lg:px-40 lg:items-center">
          <p className={`flex flex-wrap py-10`}>
            <span className={`text-4xl lg:text-6xl font-extrabold flex flex-wrap`}>Connect, Correspond and Grow.</span> <span>Build connections with other interesting cacophoners.</span>
          </p>
          <div className={`h-full`}>
            <Image layout="intrinsic" height={500} width={500} src="/img/cacophone5.jpg" />
          </div>
        </div>
      </div>
    </Container>
    </>
  )
}

export default Home
