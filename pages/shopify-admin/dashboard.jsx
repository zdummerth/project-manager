import React from 'react'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import { getLoginSession } from 'lib/auth'
import ProductsFilter from 'components/shopify-dashboard/products/ProductsFilter'

const Container = styled(Flex)`
  width: 100%;
`

export default function Home({ userId }) {

    return (
        <Container dir='column' ai='center'>
            <Flex jc='center' className='bg std-div w-100'>
                <h2>Shopify Dashboard</h2>
            </Flex>
            <ProductsFilter />
        </Container>
    )
}

export async function getServerSideProps({ req, res }) {
    try {
        const session = await getLoginSession(req, 'auth_cookie_name')
        return {
            props: {
                userId: session.userId
            },
        }
    } catch {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {},
        };
    }
}
