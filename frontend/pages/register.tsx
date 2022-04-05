import React, {useEffect, useState, useContext} from 'react'
import Image from "next/image"
import {useRouter} from "next/router"
import Link from "next/link"
import {Formik, Field, Form, FormikProps} from "formik"
import * as Yup from "yup";
import style from "../styles/scss/forms.module.scss"
import Header from "../components/Header"
import See from "../components/see"
import {signup} from "../utilities/requests"
import {MyContext} from "../components/Context"
import {user} from "../utilities/types"
import toast from 'react-hot-toast'

interface values {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

interface form{ 
  username:string,
  email:string,
  password:string,
  confirmPassword:string,
  gender:string
}

const registerSchema = Yup.object().shape({
  username:Yup.string().required("Choose a username"),
  email:Yup.string().email("Enter a valid email").required("Please enter your email"),
  password:Yup.string().min(6, "Password should be at least 6 characters long").required("Please enter your password"),
  confirmPassword:Yup.mixed().test("compare-passwords", "Passwords don't match", function(value){
    return this.parent.password === value
  }),
  gender:Yup.string().required("Choose gender")
})

const Register = () => {
  const router = useRouter()
  const context = useContext(MyContext) as {user:[{} | user, React.Dispatch<React.SetStateAction<{} | user>>]}

  const [avatar, setAvatar] = useState<string | null>(null);
  const [pVisible, setPVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false)

  

  const handleAvatar = (e:React.ChangeEvent<HTMLInputElement>, av:string|null)=>{
    const avatar = e.target.files
    
    if(avatar && !av &&  avatar['length'] > 0){

      const fileReader = new FileReader();
      fileReader.readAsDataURL(avatar[0]);
      fileReader.onload = (e)=>{

        if(e.loaded > 2097152){
          return toast.error("Image has to be less than 2mb")
        }

        const img = e.target!.result as string
        setAvatar(img)
      }
    }
    
  }

  const handleSubmit = (values:values)=>{
          setLoading(true)
          const form = new FormData();
          form.set("username", values.username);
          form.set("password", values.password);
          form.set("email", values.email);
          form.set("avatar", avatar as string);
          form.set("gender", values.gender)
          if(!avatar){
            toast.error("Choose profile picture")
          }else{
            signup(form)
            .then(res=>{
              if(res.token){
                setLoading(false)
                context.user[1](res.user)
                console.log("token saving", res.token)
                localStorage.setItem("token", res.token)
                console.log("Complete register", res)
                router.push("/app")
                toast.success("Registered successfully.")
            }
          }).catch((err:any)=>{
              console.log("Register error", err)
              setLoading(false)
              toast.error("Error signing up")
          })
          }
          
        }

  return (
    <div className="h-full flex align-center justify-around flex-col">
      <Header />
      <h1 className="text-center text-3xl my-3 lg:my-20 font-bold">Create Account</h1>
      <div className="flex flex-col-reverse justify-evenly items-center lg:flex-row">
        <Formik
        initialValues={{username:"", email:"", password:"", confirmPassword:"", gender:""}}
        onSubmit={(values)=>handleSubmit(values)}
        validationSchema={registerSchema}
        >
          {(props:FormikProps<form>) =>{
          const {touched, errors} = props;  
          return(
          <div className="c-form-cont">
            <Form className="flex flex-col justify-evenly w-100 p-3">
              <div className="flex flex-col items-center">
                <div style={{width:"250px", height:"250px"}}>
                  <Image layout="intrinsic" className="rounded-full object-cover" src={avatar ? avatar : "/img/user.svg"} width={250} height={250} alt="avatar"  />
                </div>
                {avatar ? 
                <button className="c-btn text-center my-3 bg-indigo-700 text-slate-200 dark:bg-slate-800 dark:text-slate-400" type="button" onClick={()=>setAvatar(null)}>Remove avatar</button> 
                : 
                <label htmlFor="avatar"  className="c-btn text-center my-3 bg-indigo-700 text-slate-200 dark:bg-slate-800 dark:text-slate-400">Choose avatar</label>
                }
                <input id="avatar" onChange={e=>handleAvatar(e, avatar)} type="file" className="hidden" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="username">Enter your username</label>
                <Field type="text" name="username" id="username" autoComplete="off" className="c-inp" placeholder="Reed"/>
                {touched.username && errors.username && <div className="error-msg">{errors.username}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Enter your email</label>
                <Field type="string" name="email" id="email" autoComplete="off" className="c-inp" placeholder="example@mail.com"/>
                {touched.email && errors.email && <div className="error-msg">{errors.email}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Enter password</label>
                <div className="relative">
                  <Field type={pVisible ? "text":"password"} name="password" id="password" autoComplete="off" className="c-inp" placeholder="Enter your password"/>
                  <div onClick={()=>setPVisible(!pVisible)} className="absolute right-2 top-7 cursor-pointer">
                    <See visible={pVisible}  />
                  </div>
                </div>
                {touched.password && errors.password && <div className="error-msg">{errors.password}</div>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="confirmPassword">Confirm password</label>
                <div className="relative">
                  <Field type={confirmVisible ? "text":"password"} name="confirmPassword" id="confirmPassword" autoComplete="off" className="c-inp" placeholder="Confirm your password"/>
                  <div onClick={()=>setConfirmVisible(!confirmVisible)} className="absolute right-2 top-7 cursor-pointer">
                    <See visible={confirmVisible}  />
                  </div>
                </div>
                {touched.confirmPassword && errors.confirmPassword && <div className="error-msg">{errors.confirmPassword}</div>}
              </div>
              <div className="flex justify-center my-6">
                <div className="flex flex-row justify-evenly">
                  <div className={`${style.radio_cont}`}>
                    <Field type="radio" name="gender" id="female" value="female" className={`${style.gender_radio}`} />
                    <label htmlFor="female" className={`${style.gender_label_left} ${style.gender_label} cursor-pointer`}>Female</label>
                  </div>
                  <div className={`${style.radio_cont}`}>
                    <Field type="radio" name="gender" id="male" value="male" className={`${style.gender_radio}`} />
                    <label htmlFor="male" className={`${style.gender_label_right} ${style.gender_label} cursor-pointer`}>Male</label>
                  </div>
                </div>
                {touched.gender && errors.gender && <div className="error-msg">{errors.gender}</div>}
              </div>
              <p className="italic text-slate-500 text-right pb-3 dark:text-slate-300"><Link href="/login">Already have an account?</Link></p>
              <button type="submit" className={`form-btn outline-0 ${loading ? "cursor-no-drop" : ""}`}>Join Cacophone</button>
            </Form>
          </div>
          )}
          }
        </Formik>
        <div className="">
          <Image width={400} height={400} src="/img/signup.png" layout="intrinsic" className={`${style.form_image}`} />
        </div>
      </div>
    </div>
  )
}

export default Register