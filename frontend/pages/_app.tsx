import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from "react"
import Context from '../components/Context'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <Context><Component {...pageProps} /></Context>
  )
}

export default MyApp
