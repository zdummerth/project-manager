import VariantCard from "components/products/fullProduct/VariantCard"
import styled from 'styled-components'

const Listing = styled.div`
    display: grid;
    align-items: stretch;
    justify-items center;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 10px 10px;
`
export default function VariantList({ variants = [], handleClick }) {
    // console.log("variants", variants)
    return (
        <Listing className="">
            {variants.map(({ node }) =>
                <VariantCard key={node.id} variant={node} handleClick={handleClick} />
            )}
        </Listing>
    )
}