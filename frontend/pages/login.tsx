import React, {useEffect} from 'react'
import Image from "next/image";
import {Formik, ErrorMessage, Field, Form} from "formik"
import * as Yup from "yup";
import style from "../styles/scss/forms.module.scss"
import {login} from "../utilities/requests";

const loginSchema = Yup.object().shape({
  detail:Yup.string().required("Please enter your username or email"),
  passowrd:Yup.string().required("Please enter your password")
})

const Login = () => {

  return (
    <div className="h-screen flex align-center justify-center flex-col">
      <h1>Welcome back</h1>
      <div className="flex flex-col-reverse justify-evenly w-screen items-center lg:flex-row">
        <Formik
        initialValues={{detail:"", password:""}}
        onSubmit={(values)=>{
          console.log(values)
        }}
        >
          <div className="c-form-cont">
            <Form className="flex flex-col justify-evenly w-100">
              <Field type="string" name="detail" autocomplete="off" className="c-inp" placeholder="Enter your email or username"/>
              <Field type="password" name="password" autocomplete="off" className="c-inp" placeholder="Enter your password"/>
              <button type="submit" className="form-btn outline-0">Login</button>
            </Form>
          </div>
        </Formik>
        <div>
          <Image width={350} height={350} src="/img/login.png" layout="intrinsic" className={`${style.form_image}`} />
        </div>
      </div>
    </div>
  )
}

export default Login