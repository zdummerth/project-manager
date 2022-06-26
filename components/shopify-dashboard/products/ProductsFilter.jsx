import React, { useState } from 'react'
import { Search } from '@styled-icons/boxicons-regular'
import useProducts from 'hooks/useProducts'
import ProductList from 'components/shopify-dashboard/products/ProductList'

const Products = ({ searchQuery }) => {
    const { data, error, loading } = useProducts(searchQuery)
    return (
        <div className='w-100'>
            {error && (
                <div>...error loading products. refresh to try again</div>
            )}
            {loading && (
                <div>...loading products</div>
            )}
            {data && (
                <ProductList products={data} />
            )}
        </div>
    )
}


export default function ProductsFilter() {
    const [searchTerm, setSearchTerm] = useState('')

    const createSearchQuery = (tagsArray) => {
        // return 'tag:'.concat(tagsArray.join(' AND tag:'))
        if (searchTerm.length < 3) {
            return `status:active`
        }
        return `status:active AND ${searchTerm}`
    }

    const searchQuery = createSearchQuery()

    return (
        <>
            <div className="flex fai-c mb-s">
                <Search size='22' />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <Products
                searchQuery={searchQuery}
            />
        </>
    )
}