import {useEffect, useContext} from 'react'
import {useRouter} from "next/router"
import Container from "../../components/Container"
import {MyContext} from "../../components/Context"
import ChatContainer from "../../components/ChatContainer"

const Chat = () => {
  const router = useRouter()
  const context = useContext(MyContext)

  useEffect(()=>{
    const id = router.query.id
    console.log(id)
  }, [])
  return (
    <Container>
      <div className="flex h-full">
        <div className="basis-1/4 border-r border-slate-300 dark:bg-slate-700 bg-slate-200 dark:border-slate-600">{

        }</div>
        <ChatContainer />
      </div>
    </Container>
  )
}

export default Chat