import { useEffect, useState } from 'react'
import { getProductAvailability } from 'lib/shopify'


export function useAvailability(handle = '', selectedVariant) {
    const [vAvailable, setVAvailable] = useState(true)
    const [pAvailable, setPAvailable] = useState(true)


    useEffect(() => {
        const init = async () => {
            const avail = await getProductAvailability(handle)
            console.log({ avail })
            // console.log('avail', avail.totalInventory)
            if (avail.totalInventory === 0) {
                setPAvailable(false)
            } else if (selectedVariant) {
                const a = avail.variants.edges.find(({ node }) => node.id === selectedVariant.node.id)
                // console.log({ a })
                // console.log('var avail', a.node.availableForSale)

                setVAvailable(a.node.availableForSale)
            }
        }

        try {
            init()
        } catch {
            setPAvailable(false)
            setVAvailable(false)
        }
    }, [handle, selectedVariant])

    return { pAvailable, vAvailable }
}
