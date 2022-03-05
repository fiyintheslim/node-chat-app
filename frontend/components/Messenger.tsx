import React from 'react'

const Messenger = () => {
  return (
    <div className="sticky bottom-0 left-0 flex">
        <input type="text" className="grow m-2 outline-none bg-slate-400 rounded-md p-2" />
        <button type="button">Send</button>
    </div>
  )
}

export default Messenger