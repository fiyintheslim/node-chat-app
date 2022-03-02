import React, {useEffect, useContext, Context} from 'react';
import Header from "./Header";
import {MyContext} from "./Context"
import Navigation from "./Navigation"



const Container: React.FC = ({children}) => {

  return (
    <>
      <Header />
      <div className="h-screen pb-20 md:pb-0 relative md:flex md:flex-row-reverse">
        <div className="h-full  grow md:oveflow-y-auto md:ml-24">
        {children}
        </div>
        <Navigation />
      </div>
    </>
  )
}

export default Container