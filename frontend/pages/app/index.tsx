import React, {useEffect} from 'react'
import {NextApiRequest, NextApiResponse, GetServerSideProps} from "next"
import Navigation from "../../components/Navigation"
import Header from "../../components/Header"
import Container from "../../components/Container"
import {me, trial} from "../../utilities/requests"

export const getServerSideProps:GetServerSideProps = async (ctx)=>{
  // console.log(ctx)
  // console.log("Request", ctx.req.cookies);
  // console.log("Response", ctx.res);
  //const user = await trial()
  //console.log(user)

  return {
   props:{}
  }
}

const Home = () => {
  useEffect(()=>{
    trial().then(res=>console.log(res)).catch(err=>console.log("Error in trail", err))
  }, [])
  console.log("something")
  return (
      <Container>
        <h1>Home</h1>
      </Container>
  )
}

export default Home