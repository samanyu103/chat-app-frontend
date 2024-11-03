import React, { useState, createContext } from 'react'

export const myContext = createContext(null)


const Context = ({children}) => {
    const [senderName ,setsenderName] = useState("");    
    const [email, setemail] = useState("");
    const [password ,setpassword] = useState(""); 

  return (
    <myContext.Provider value={{senderName, setsenderName, email, setemail, password, setpassword}}>
        {children}
    </myContext.Provider>
  )
}

export default Context