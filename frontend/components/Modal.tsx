import {useState, Dispatch, SetStateAction} from "react"
import {Dialog} from "@headlessui/react"

interface Props{
    isOpen:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>
}

const MyDialog = (props:Props)=>{
    const {isOpen, setOpen} = props
    //const [open, setOpen]= useState(false)
    return(
        <Dialog open={isOpen} onClose={()=>setOpen(false)}>
            <Dialog.Overlay />
            <div>Modal open</div>
        </Dialog>
    )
}

export default MyDialog