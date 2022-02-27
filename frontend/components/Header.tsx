import React from 'react'
import Link from "next/link";
import Image from "next/image"
import {useRouter} from "next/router";

const Header = () => {
  const router = useRouter();
  const home = ()=>{
    router.push("/")
  }
  const back = ()=>{
    router.back();
  }
  return (
    <div className="flex justify-center shadow-lg bg-slate-200 z-50 sticky top-0 left-0 dark:bg-slate-700 dark:shadow-slate-800">
      <svg onClick={back} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="cursor-pointer absolute left-6 lg:left-16 top-5 fill-slate-900 dark:fill-slate-100" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      <Image onClick={home} src="/img/LOGO.png" layout="intrinsic" className="p-0 m-0 cursor-pointer" width={80} height={80} />
    </div>
  )
}

export default Header