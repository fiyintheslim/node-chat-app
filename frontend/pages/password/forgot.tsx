import React, {useEffect} from 'react'
import Image from "next/image";
import {Formik, ErrorMessage, Field, Form, FormikErrors} from "formik"
import * as Yup from "yup";
import style from "../../styles/scss/forms.module.scss"
import {login} from "../../utilities/requests";
import Header from "../../components/Header"


const loginSchema = Yup.object().shape({
    avatar:Yup.mixed().test("fileSize", "The file is too large", (value)=>{
        return true
    }),
  detail:Yup.string().required("Please enter your username or email"),
  passowrd:Yup.string().required("Please enter your password")
})

const Login = () => {

  return (
    <div className="h-full flex align-center justify-around flex-col">
      <Header />
      <h1 className="text-center text-3xl my-3 lg:my-20 font-bold">Password Reset</h1>
      <div className="flex flex-col-reverse justify-evenly w-screen items-center lg:flex-row">
        <Formik
        initialValues={{detail:"", password:""}}
        onSubmit={(values)=>{
          console.log(values)
        }}
        >
          <div className="c-form-cont">
            <Form className="flex flex-col justify-evenly w-100">
              <label htmlFor="email">Enter your Cacophone email</label>
              <Field id="email" type="string" name="detail" autocomplete="off" className="c-inp" placeholder="Enter your email or username"/>
              <button type="submit" className="form-btn outline-0">Reset Password</button>
            </Form>
          </div>
        </Formik>
        <div>
          <Image width={350} height={350} src="/img/signup.png" layout="intrinsic" className={`${style.form_image}`} />
        </div>
      </div>
    </div>
  )
}

export default Login