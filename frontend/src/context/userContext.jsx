import React, { createContext, useState } from 'react'

export const userDataContext = createContext();
const userContext = ({ children }) => {

    const [user, setUser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })
    const value = {
        user,
        setUser
    }
    return (
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default userContext