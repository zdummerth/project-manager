import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
export const AppStateContext = React.createContext()


const AppStateProvider = ({ children }) => {
    const initState = {
        menuOpen: false,
        modalOpen: ''
    }

    const router = useRouter()
    const [appState, setAppState] = useState(initState)

    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
            if (appState.menuOpen) {
                setAppState(prev => ({
                    ...prev,
                    menuOpen: false,
                    modelOpen: ''
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
        toggleMenuOpen: () => {
            setAppState(prev => ({
                ...prev,
                menuOpen: !appState.menuOpen
            }))
        },
        setModal: (modal) => {
            setAppState(prev => ({
                ...prev,
                modalOpen: modal
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