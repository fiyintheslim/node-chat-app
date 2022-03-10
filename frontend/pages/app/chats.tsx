import {useEffect} from 'react'
import {useRouter} from "next/router"
import Navigation from "../../components/Navigation"
import Container from "../../components/Container"

const Chat = () => {
  const router = useRouter()
  useEffect(()=>{
    const id = router.query.id
    console.log(id)
  }, [])
  return (
    <Container>
      <div className="flex h-full">
        <div className="basis-1/4 border-r border-slate-300 dark:bg-slate-700 bg-slate-200 dark:border-slate-600">chats</div>
        <div className="grow">messages</div>
      </div>
    </Container>
  )
}

export default Chat