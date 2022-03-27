import {useState, useContext, useEffect, Dispatch, SetStateAction} from "react"
import Modal from "./Modal"
import toast from "react-hot-toast"
import CreateGroup from "./CreateGroup"
import {MyContext} from "./Context"
import GroupCard from "./GroupCard"
import {getGroups, joinGroup} from "../utilities/requests"
import {group, user} from "../utilities/types"

interface Props {
    myGroups: group[]
}

const AllGroups = (props:Props) => {
    
    const {myGroups} = props;

    const [createGroupModal, setCreateGroupModal] = useState(false)
    const [joinGroupModal, setJoinGroupModal] = useState(false)
    const [groups, setGroups] = useState<group[]>()
    const [chosenGroup, setChosenGroup] = useState<group>()

    const context = useContext(MyContext) as {user: [undefined | user, Dispatch<SetStateAction<undefined | user>>]}

    useEffect(()=>{
        getGroups()
        .then(res=>{
            console.log("in All Groups", res)
            setGroups(res)
        })
        
    }, [])
    
    const openModal = () => {
        setCreateGroupModal(true)
    }
    const handleJoinModal = (group:group) => {
        setChosenGroup(group)
        setJoinGroupModal(true)
    }
    const handleConfirm = (groupid:string) => {

        joinGroup(groupid)
        .then(res=>{
            toast.success(`Joined ${chosenGroup?.groupname} successfully.`)
        })
        setJoinGroupModal(false)
    }
    

   
    return (
        <>
    <div className="h-full w-full overflow-y-scroll">
        <div className="mt-3">{groups && groups.map((group)=>{
            return(<GroupCard member={myGroups.find((grp)=>grp.groupid === group.groupid)} join={handleJoinModal} key={group.groupid} group={group} />)
        })}</div>
        
        <div onClick={openModal} className="fixed bottom-2 right-2 bg-indigo-700 p-3 rounded-xl cursor-pointer active:bg-slate-700 dark:bg-indigo-800">
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
                <p className="text-center">{JSON.parse(chosenGroup.interests).map((int:string)=><span className="px-2 py-1 rounded-full bg-indigo-500 mx-1">{int}</span>)}</p>
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