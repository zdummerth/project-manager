import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
export const AppStateContext = React.createContext()


const AppStateProvider = ({ children }) => {
    const initState = {
        donateOpen: false,
        menuOpen: false
    }

    const router = useRouter()
    const [appState, setAppState] = useState(initState)

    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
            if (appState.menuOpen) {
                setAppState(prev => ({
                    ...prev,
                    menuOpen: false
                }))
            }
        }

        router.events.on('routeChangeStart', handleRouteChange)

        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    })

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