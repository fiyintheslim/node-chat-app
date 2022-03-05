import React from 'react'

const Messenger = () => {
  return (
    <div className="sticky bottom-0 left-0 flex">
        <textarea style={{resize:"none"}} className="grow m-1 w-full outline-none bg-indigo-400 dark:bg-slate-400 rounded-md p-2 dark:text-slate-900" >
        </textarea>
        <button type="button" className="animate-none outline-none w-15 h-15 bg-indigo-700 border-2 dark:bg-slate-500 m-1 rounded-md p-2 active:bg-inherit">Send</button>
    </div>
  )
}

export default Messenger