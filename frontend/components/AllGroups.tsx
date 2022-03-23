import {useState, useRef} from "react"
import Modal from "./Modal"

const AllGroups = () => {
    const dropZone = useRef<HTMLDivElement>(null)
    const [modal, setModal] = useState(false)

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
                <input id="groupName" className="outline-none rounded-lg h-10 w-full p-1" type="text" placeholder="15 hours of work"/>
            </div>
            <div className="flex flex-col items-start w-full">
                <label htmlFor="interests"> Enter interests</label>
                <textarea id="interests" className="outline-none w-full rounded-lg p-3" placeholder="separate with commas (,)"></textarea>
            </div>
            <div className="w-full my-3 flex justify-center">
                <button className="bg-indigo-700 p-3 rounded">Create Group</button>
            </div>
        </div>
    </Modal>
    </>
    )
}

export default AllGroups;