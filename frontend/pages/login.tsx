import React, {useEffect, useState} from 'react'
import Image from "next/image";
import Link from "next/link"
import {useFormik, Formik, ErrorMessage, Field, Form, FormikErrors, FormikProps} from "formik"
import * as Yup from "yup";
import style from "../styles/scss/forms.module.scss"
import {login} from "../utilities/requests";
import Header from "../components/Header"
import See from "../components/see"


const loginSchema = Yup.object().shape({
  detail:Yup.string().min(3).required("Please enter your username or email"),
  password:Yup.string().min(6, "Password is at least 6 charcters long").required("Please enter your password")
})

interface form{ detail:string, password:string}

const Login = () => {
  const [pVisible, setPVisible] = useState(false)
  return (
    <div className="h-full flex align-center justify-around flex-col">
      <Header />
      <h1 className="text-center text-3xl my-4 pl-2 lg:my-20 font-bold">Welcome back</h1>
      <div className="flex flex-col-reverse justify-evenly w-screen items-center lg:flex-row">
        <Formik
        initialValues={{detail:"", password:""}}
        onSubmit={(values)=>{
          console.log(values)
        }}
        validationSchema={loginSchema}
        >
          {(form:FormikProps<form>)=>{
              const {touched, errors} = form
            return(
          <div className="c-form-cont">
            
            <Form className="flex flex-col justify-evenly w-100">
              <div className="flex flex-col">
                <label htmlFor="detail">Enter Email or Username</label>
                <Field id="detail" type="text" name="detail" autoComplete="off" className="c-inp" placeholder="Enter your email or username"/>
                {touched.detail && errors.detail &&<div className="error-msg">{errors.detail}</div>}
              </div>
              <div className="c-inp-cont">
                <label htmlFor="password"> Enter password</label>
                <div className="relative">
                  <Field id="password" type={pVisible?"text":"password"} name="password" autoComplete="off" className="c-inp" placeholder="Enter your password"/>
                  <div onClick={()=>setPVisible(!pVisible)} className="absolute right-2 top-7 cursor-pointer">
                    <See visible={pVisible}  />
                  </div>
                </div>
                {touched.password && errors.password &&<div className="error-msg">{errors.password}</div>}
              </div>
              <p className="italic text-slate-500 text-right pb-3 dark:text-slate-300"><Link href="/password/forgot">Forgot password?</Link></p>
              <button type="submit" className="form-btn outline-0">Login</button>
            </Form>
            
          </div>
          )
        }}
        </Formik>
        <div>
          <Image width={350} height={350} src="/img/login.png" layout="intrinsic" className={`${style.form_image}`} />
        </div>
      </div>
    </div>
  )
}

export default Login