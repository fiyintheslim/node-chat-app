import React from 'react'
import Link from "next/link";
import Image from "next/image"

const Header = () => {
  return (
    <div className={`shadow-lg shadow-black flex justify-between items-center py-2 lg:px-40`}>
      <div className={`font-extrabold text-4xl`} style={{fontFamily:"'Epilogue'", fontWeight:"900"}}><Link href="/" ><Image src="/img/LOGO.png" layout="intrinsic" width={150} height={150} /></Link></div>
      <div className={`text-slate-800 font-extrabold flex justify-evenly`} >
        <div className={`border border-white mr-5 c-btn`} ><Link href="/signup">Login</Link></div>
        <div className={`c-btn bg-red-600 shadow-red-300`}><Link href="/login">Sign Up</Link></div>
      </div>
    </div>
  )
}

export default Header