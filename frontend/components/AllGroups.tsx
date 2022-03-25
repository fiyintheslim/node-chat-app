import {useState, useRef} from "react"
import Modal from "./Modal"
import toast from "react-hot-toast"

const AllGroups = () => {
    const dropZone = useRef<HTMLDivElement>(null)
    const [modal, setModal] = useState(false)
    const [interests, setInterests] = useState(["football", "basketball", "baseball", "snooker"])
    const openModal = () => {
        setModal(true)
    }
    
    const dragOverHandler = (e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault();
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
    return (
        <>
    <div className="h-full overflow-y-scroll">
        All groups
        <div onClick={openModal} className="fixed bottom-2 right-2 bg-indigo-700 p-3 rounded-full cursor-pointer active:bg-slate-700 dark:bg-indigo-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </div>
    </div>
    <Modal isOpen={modal} setOpen={setModal}>
        <div className="flex flex-col items-start">
            <h2>Create Group</h2>
            <div className="w-full h-64 my-6 flex flex-col justify-center items-center border rounded-md bg-indigo-200 " ref={dropZone} onDragOver={(e)=>dragOverHandler(e)} onDrop={(e)=>dropHandler(e)} onDragLeave={(e)=>handleDragLeave(e)} >
                <p className="py-4">Drag & Drop Image.</p>
                <label htmlFor="groupAvatar" className="bg-indigo-500 p-3 rounded">Choose group Image</label>
                <input id="groupAvatar" className="hidden" type="file" />
            </div>
            <div className="flex flex-col items-start w-full">
                <label htmlFor="groupName">Enter group name</label>
                <input id="groupName" className="bg-slate-300 text-slate-900 outline-none rounded-lg h-10 w-full p-1 dark:bg-slate-500 dark:text-slate-50" type="text" placeholder="15 hours of work"/>
            </div>
            <div className="flex flex-col items-start w-full">
                <label htmlFor="interests"> Enter interests</label>
                <input onChange={(e)=>addInterest(e)} id="interests" className="bg-slate-300 text-slate-900 outline-none w-full rounded-lg p-3 dark:bg-slate-500 dark:text-slate-50" placeholder="separate with commas (,)"/>
                <div className="flex flex-wrap justify-evenly my-3">{interests.map((el)=>(
                <p className="mx-1 bg-slate-300 text-slate-900 p-2 rounded-xl flex justify-between items-center">
                    <span className="text-xs">
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
                <button className="bg-indigo-700 p-3 rounded outline-none">Create Group</button>
            </div>
        </div>
    </Modal>
    </>
    )
}

export default AllGroups;