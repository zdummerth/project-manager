import { useContext } from 'react'
import { AppStateContext } from '/context/AppStateProvider'

const useAppState = () => {
    return useContext(AppStateContext)
}

export default useAppState