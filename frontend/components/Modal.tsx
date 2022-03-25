import {useState, Dispatch, SetStateAction, ReactNode} from "react"
import {Dialog} from "@headlessui/react"

interface Props{
    isOpen:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
    children: ReactNode

}

const Modal = (props:Props)=>{
    const {isOpen, setOpen, children} = props
    //const [open, setOpen]= useState(true)
    return(
        <Dialog open={isOpen} onClose={()=>setOpen(false)} className="fixed z-50 top-30 flex items-center justify-center w-screen h-screen top-0 left-0 border" >
            <Dialog.Overlay className="z-10 bg-slate-900 absolute top-0 left-0 w-full h-full opacity-25" />
            <div className="bg-slate-400 m-4 w-full md:w-96 rounded-xl p-2 z-50 relative dark:bg-slate-800 dark:text-slate-200">
                    <svg onClick={()=>setOpen(false)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x cursor-pointer absolute right-3 top-3" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                {children}
            </div>
        </Dialog>
    )
}

export default Modal