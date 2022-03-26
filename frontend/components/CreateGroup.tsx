import React, {useState, useRef} from 'react'
import Image from "next/image"
import toast from "react-hot-toast"
import {createGroup} from "../utilities/requests"

interface Props {
    setModal:React.Dispatch<React.SetStateAction<boolean>>
}

const CreateGroup = (props:Props) => {
    const {setModal} = props
    const dropZone = useRef<HTMLDivElement>(null)
    const [interests, setInterests] = useState<string[]>([])
    const [groupName, setGroupName] = useState("")
    const [avatar, setAvatar] = useState<string>("")

    const dragOverHandler = (e:React.DragEvent)=>{
        e.preventDefault();
        console.log("drag over")
        dropZone.current?.classList.add("bg-indigo-800")
    }
    const handleDragLeave = (e:React.DragEvent)=>{
        e.preventDefault();
        console.log("Drag leave event")
        dropZone.current?.classList.remove("bg-indigo-800")
    }
    const dropHandler = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        console.log("Dropping file")
        console.log("Image", e.dataTransfer.files[0])
        const fileReader = new FileReader()
        fileReader.readAsDataURL(e.dataTransfer.files[0])

        fileReader.onload = function (e) {
            if(e.loaded > 2097152){
                return toast.error("Image has to be less than 2mb")
              }
      
              const img = e.target!.result as string
              console.log("Image uploaded", img)
              setAvatar(img)
        }
    }
    const uploadFile = (e:React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader()
        if(e.target.files){
        fileReader.readAsDataURL(e.target.files[0])

        fileReader.onload = function (e) {
            if(e.loaded > 2097152){
                return toast.error("Image has to be less than 2mb")
              }
      
              const img = e.target!.result as string
              console.log("Image uploaded", img)
              setAvatar(img)
        }
    }
    } 
    const removeInterest = (interest:string) => {
        setInterests(interests.filter(e=>e !== interest))
    }
    function addInterest (e:React.ChangeEvent<HTMLInputElement>) {
        
        e.target.onkeyup = function (this, ev){
            if(ev.key === "," || ev.key === " " || ev.key === "Enter"){
                if(interests.length < 5){
                    const interest = e.target.value.replace(/[, ]/g, "")
                    if(!interests.find(int=>int.toLowerCase() === interest.toLowerCase())){
                        setInterests([...interests, interest])
                    }
                }else{
                    toast.error("At most 5 interests")
                }
                e.target.value= ""
            }
        }
        
        
    }
    const createGroupHandler = () => {
        const interestString = JSON.stringify(interests)
        const formData = new FormData()
        formData.set("groupName", groupName);
        formData.set("interests", interestString);
        formData.set("avatar", avatar)
        createGroup(formData)
        setModal(false)
    }
  return (
    <div className="flex flex-col items-start">
    <h2 className="text-center font-extrabold m-3">Create Group</h2>
    <div className="w-full h-64 my-6 flex flex-col justify-center items-center border rounded-md  relative p-1" ref={dropZone} onDragOver={(e)=>dragOverHandler(e)} onDrop={(e)=>dropHandler(e)} onDragLeave={(e)=>handleDragLeave(e)} >
        {avatar &&
            <Image layout="fill" src={avatar} className="z-10 rounded-md"/>
        }
        <div className="z-20 opacity-75 bg-indigo-200 w-full h-full flex flex-col justify-center items-center rounded-md">
            <p className="py-4 font-bold text-slate-800">Drag &amp Drop Image.</p>
            <label htmlFor="groupAvatar" className="bg-indigo-500 p-3 rounded cursor-pointer">Choose group Image</label>
            <input onChange={uploadFile} id="groupAvatar" className="hidden" type="file" />
        </div>
    </div>
    <div className="flex flex-col items-start w-full mt-2">
        <label htmlFor="groupName" className="font-bold italic">Enter group name</label>
        <input value={groupName} onChange={(e)=>setGroupName(e.target.value)} id="groupName" className="bg-slate-300 text-slate-900 outline-none rounded-lg h-10 w-full p-1 dark:bg-slate-500 dark:text-slate-50" type="text" placeholder="15 hours of work"/>
    </div>
    <div className="flex flex-col items-start w-full mt-2">
        <label htmlFor="interests" className="font-bold italic"> Enter interests</label>
        <input onChange={(e)=>addInterest(e)} id="interests" className="bg-slate-300 text-slate-900 outline-none w-full rounded-lg p-3 dark:bg-slate-500 dark:text-slate-50" placeholder="separate with commas (,)"/>
        <div className="flex flex-wrap justify-start my-3">{interests.map((el, i)=>(
        <p key={i} className="m-1 bg-slate-300 text-slate-900 p-2 rounded-xl flex justify-between items-center">
            <span className="text-xs font-bold">
                {el}
            </span>
            <span>
                <svg onClick={()=>removeInterest(el)} xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-x cursor-pointer" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </span>
        </p>)
        )}</div>
    </div>
    <div className="w-full my-3 flex justify-center">
        <button onClick={createGroupHandler} className="bg-indigo-700 p-3 rounded outline-none">Create Group</button>
    </div>
</div>
  )
}

export default CreateGroup