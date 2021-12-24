import React, { useState } from 'react'
export const AppStateContext = React.createContext()


const AppStateProvider = ({ children }) => {
    const initState = {
        donateOpen: false,
        menuOpen: false
    }

    const [appState, setAppState] = useState(initState)

    const value = {
        ...appState,
        toggleDonateOpen: () => {
            setAppState(prev => ({
                ...prev,
                donateOpen: !appState.donateOpen
            }))
        },
        toggleMenuOpen: () => {
            setAppState(prev => ({
                ...prev,
                menuOpen: !appState.menuOpen
            }))
        }
    }

    return (
        <AppStateContext.Provider value={value}>
            {children}
        </AppStateContext.Provider>
    )
}

export default AppStateProvider