import {useState} from 'react'
import {useRouter} from "next/router"
import {deleteAccount} from "../utilities/requests"

const Warning = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const confirm = ()=>{
        setLoading(true)
        deleteAccount()
        .then((res)=>{
            localStorage.removeItem("token");
            router.push("/")
            setLoading(false)
        })
        .catch((err:any)=>{
            setLoading(false)
        })
    }
  return (
    <div>
        <p className="py-4 w-64 px-2 text-lg font-bold">Are you sure you want to delete your account?</p>
        <div className="flex w-96 justify-center py-4">
            
            <button disabled={loading} onClick={confirm} className={`bg-green-600 shadow p-3 w-20 flex justify-center rounded-lg ${loading ? "cursor-not-allowed" : "cursor-pointer"} outline-0`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                </svg>
            </button>
        </div>
    </div>
  )
}

export default Warning