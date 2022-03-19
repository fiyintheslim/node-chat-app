import {useContext, Dispatch, SetStateAction, useEffect} from 'react'
import {useRouter} from "next/router"
import Navigation from "../../components/Navigation"
import Container from "../../components/Container"
import {MyContext} from "../../components/Context"
import {user} from "../../utilities/types"

const Profile = () => {
  const context = useContext(MyContext) as {user: [undefined | user, Dispatch<SetStateAction<undefined | user>>]}
  const meContext = context.user[0] 
 
  useEffect(()=>{}, [])

  return (
    
    <Container>
      <div>

      </div>
    </Container>
  )
}

export default Profile