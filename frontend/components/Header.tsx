import React from 'react'
import Link from "next/link";
import Image from "next/image"

const Header = () => {
  return (
    <div className={` flex justify-between items-center py-2 lg:px-40`}>
      <Link href="/" >
        <Image src="/img/LOGO.png" layout="intrinsic" className="p-0 m-0" width={80} height={80} />
      </Link>
      <div className={`text-slate-800 font-extrabold flex justify-evenly`} >
        <div className={`border border-white mr-5 c-btn`} ><Link href="/login">Login</Link></div>
        <div className={`c-btn bg-indigo-700 `}><Link href="/signup">Sign Up</Link></div>
      </div>
    </div>
  )
}

export default Header