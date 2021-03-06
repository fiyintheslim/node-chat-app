import {useState, Dispatch, SetStateAction} from "react";
import {useRouter} from "next/router"
import {Dialog} from "@headlessui/react"
import {updateDescription} from "../utilities/requests"

interface Props {
    loading:boolean,
    setLoading:Dispatch<SetStateAction<boolean>>,
    setModal:Dispatch<SetStateAction<boolean>>
}

const Description = (props:Props)=>{
    const {loading, setLoading, setModal} = props;
    const router = useRouter()
    const count = 2000
    const [desc, setDesc] = useState("");

    const handleDescription = () => {
        if(desc.length > 0){
            setLoading(true)
            updateDescription(desc, setLoading, router)
            setModal(false)
        }
    }

    return(
        <div>
            <div className="w-full">
                <Dialog.Title className="py-4 font-bold">Update Profile Description</Dialog.Title>
                <textarea 
                onChange={(e)=>{
                    if(desc.length < count){
                    setDesc(e.target.value)
                    }
                }}
                onKeyPress={(e)=>{
                    let arr:string[] = []
                    arr = [...arr, e.key]
                    console.log(arr)
                    if(e.key === "Backspace"){
                        setDesc(desc.slice(0, desc.length-1))
                    }
                }}
                value={desc} className="h-64 outline-0 w-full border border-slate-500 p-3 rounded bg-slate-300"></textarea>
                <p className="text-slate-600">{count - desc.length}</p>
            </div>
            <div className="flex justify-center">
                <button onClick={()=>{handleDescription()}} disabled={loading} className={`bg-green-600 p-3 w-20 flex justify-center rounded-lg ${loading?"cursor-no-drop":"cursor-pointer"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Description