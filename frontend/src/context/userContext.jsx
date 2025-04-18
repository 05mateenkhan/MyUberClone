import React, { createContext } from 'react'

export const userDataContext = createContext();
const userContext = ({ children }) => {
    return (
        <div>
            <userDataContext.Provider>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default userContext