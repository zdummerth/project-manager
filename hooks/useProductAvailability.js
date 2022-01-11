import { useEffect, useState, useCallback } from 'react'
import { getProductAvailability } from 'lib/shopify'


export function useAvailability(handle, selectedVariant) {
    const [vAvailable, setVAvailable] = useState(true)
    const [pAvailable, setPAvailable] = useState(true)


    const checkAvailabilty = useCallback(
        (handle, selectedVariant) => {
            setPAvailable(true)
            getProductAvailability(handle).then(res => {
                // console.log('avail res', res)
                if (res.totalInventory === 0) {
                    setPAvailable(false)
                } else if (selectedVariant) {
                    const a = res.variants.edges.find(({ node }) => node.id === selectedVariant.node.id)
                    // console.log({ a })
                    setVAvailable(a.node.availableForSale)
                }
            })
        }, [handle, selectedVariant, getProductAvailability]
    )


    useEffect(() => {
        try {
            checkAvailabilty(handle, selectedVariant)
        } catch (e) {
            setPAvailable(false)
            setVAvailable(false)
        }
    }, [handle, selectedVariant, checkAvailabilty, getProductAvailability])

    return { pAvailable, vAvailable }
}
