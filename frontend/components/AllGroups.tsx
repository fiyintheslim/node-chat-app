import React, {useState, useContext, useEffect, Dispatch, SetStateAction} from "react"
import {useRouter} from "next/router"
import Modal from "./Modal"
import toast from "react-hot-toast"
import CreateGroup from "./CreateGroup"
import {MyContext} from "./Context"
import GroupCard from "./GroupCard"
import {getGroups, joinGroup} from "../utilities/requests"
import {group, user} from "../utilities/types"

interface Props {
    myGroups: group[],
    loadMyGroups:()=>void,
    setShowChats:React.Dispatch<React.SetStateAction<boolean>>,
    showChats:boolean
}

const AllGroups = (props:Props) => {
    const router = useRouter();
    const {myGroups, loadMyGroups, setShowChats, showChats} = props;

    const [createGroupModal, setCreateGroupModal] = useState(false)
    const [joinGroupModal, setJoinGroupModal] = useState(false)
    const [groups, setGroups] = useState<group[]>()
    const [chosenGroup, setChosenGroup] = useState<group>()

    const context = useContext(MyContext) as {user: [undefined | user, Dispatch<SetStateAction<undefined | user>>]}

    useEffect(()=>{
        getGroups()
        .then(res=>{
            
            setGroups(res)
        })
        
    }, [])
    
    const openModal = () => {
        setCreateGroupModal(true)
    }
    const handleJoinModal = (group:group) => {
        setChosenGroup(group)
        setJoinGroupModal(true)
        setShowChats(false)
    }
    const handleConfirm = (groupid:string) => {
        const formData = new FormData();
        formData.set("groupId", groupid)
        joinGroup(formData)
        .then(res=>{
            toast.success(`Joined ${chosenGroup?.groupname} successfully.`)
            loadMyGroups()
        })
        setJoinGroupModal(false)
    }
    

   
    return (
        <>
    <div className="h-full w-full overflow-y-scroll moz-scroll pb-24 md:pb-0">
        <div onClick={()=>setShowChats(!showChats)} className={`z-40 bg-slate-400 cursor-pointer p-2 rounded-full absolute right-3 top-4 md:hidden dark:bg-slate-700`}>
            {showChats ?
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle fill" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
            </svg>}
          </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">{groups && groups.map((group)=>{
            return(<GroupCard member={myGroups.find((grp)=>grp.groupid === group.groupid)} join={handleJoinModal} key={group.groupid} group={group} />)
        })}</div>
        
        <div onClick={openModal} className="z-30 fixed bottom-24 md:bottom-2 right-2 bg-indigo-700 p-3 rounded-xl cursor-pointer active:bg-slate-700 dark:bg-indigo-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </div>
    </div>
    <Modal isOpen={createGroupModal} setOpen={setCreateGroupModal}>
        <CreateGroup setModal={setCreateGroupModal} />
    </Modal>
    <Modal isOpen={joinGroupModal} setOpen={setJoinGroupModal}>
        {chosenGroup ?
        <div>
            <h2 className="text-xl font-bold text-center py-3">Join {chosenGroup.groupname}?</h2>
            <div className="my-4">
                <p className="text-center flex flex-wrap">{JSON.parse(chosenGroup.interests).map((int:string, i:number)=><span key={i} className="m-1 px-2 py-1 rounded-full bg-indigo-500 mx-1">{int}</span>)}</p>
            </div>
            {myGroups.find((grp)=>grp.groupid === chosenGroup.groupid) ?
            <div className="my-3">
                <p className="text-center">You are a part of {chosenGroup.groupname}</p>
            </div>
        :
            <div className="flex justify-center w-full">
                <button onClick={()=>handleConfirm(chosenGroup.groupid)} className={`outline-none bg-green-600 p-3 w-20 flex justify-center rounded-lg cursor-pointer outline-0`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>
                </button>
            </div>
        }
            
        </div>
        :
        <div>
            loading...
        </div>
        }
    </Modal>
    </>
    )
}

export default AllGroups;