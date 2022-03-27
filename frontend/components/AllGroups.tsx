import {useState, useRef, useEffect} from "react"
import Modal from "./Modal"
import toast from "react-hot-toast"
import CreateGroup from "./CreateGroup"
import GroupCard from "./GroupCard"
import {getGroups} from "../utilities/requests"
import {group} from "../utilities/types"

const AllGroups = () => {
    
    const [modal, setModal] = useState(false)
    const [groups, setGroups] = useState<group[]>()
    useEffect(()=>{
        getGroups()
        .then(res=>{
            console.log("in AllGroups", res)
            setGroups(res)
        })
        
    }, [])
    
    const openModal = () => {
        setModal(true)
    }
    
   
    return (
        <>
    <div className="h-full w-full overflow-y-scroll">
        <div className="mt-3">{groups && groups.map((group)=>{
            return(<GroupCard key={group.groupid} group={group} />)
        })}</div>
        
        <div onClick={openModal} className="fixed bottom-2 right-2 bg-indigo-700 p-3 rounded-full cursor-pointer active:bg-slate-700 dark:bg-indigo-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </div>
    </div>
    <Modal isOpen={modal} setOpen={setModal}>
        <CreateGroup setModal={setModal} />
    </Modal>
    </>
    )
}

export default AllGroups;