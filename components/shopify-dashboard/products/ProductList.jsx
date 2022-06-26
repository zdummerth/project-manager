import ProductCard from "components/shopify-dashboard/products/ProductCard"
import styled from 'styled-components'

const Listing = styled.div`
    // display: grid;
    // align-items: stretch;
    // justify-items center;
    // grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    // gap: 10px 10px;
`
export default function ProductList({ products = [] }) {
    return (
        <Listing className="">
            {products.map(({ node }) =>
                <ProductCard key={node.id} product={node} />
            )}
        </Listing>
    )
}