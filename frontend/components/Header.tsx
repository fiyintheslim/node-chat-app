import React from 'react'
import Link from "next/link"

const Header = () => {
  return (
    <div className={`flex justify-between items-center px-2 py-8 lg:mx-40`}>
      <div className={`font-extrabold`} style={{fontFamily:"'Epilogue'", fontWeight:"900"}}><Link href="/" >Cacophone</Link></div>
      <div className={`rounded-full p-3 text-white bg-red-600 font-extrabold cursor-pointer shadow-md shadow-red-300`}><Link href="/signin">Sign in</Link></div>
    </div>
  )
}

export default Header