import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

import { colors } from 'styles'

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  margin: 10px 0;
`

const A = styled.a`
  border: 1px solid ${colors.brand};
  border-radius: 50px;
  padding: 5px 10px;
  margin: 5px;
  background: ${({ active, theme }) => active ? colors.gradient : colors.darkGradient};
`




const ProductNav = ({ collections = [], className }) => {
  // console.log('de arrya', featured)
  const router = useRouter()
  console.log('router', router.query?.collection)

  // console.log({ collections })

  return (
    <Nav className={className}>
      {collections.map((c, index) => {
        // const path = c.node.handle === 'gift-card'
        //   ? '/products/dark-ace-gift-card'
        //   : `/collections/${c.node.handle}`
        const path = `/collections/${c.node.handle}`
        return (
          <Link
            key={c.node.handle + index}
            href={path}
          >
            <A
              active={c.node.handle === router.query?.collection}
            >
              {c.node.title}
            </A>
          </Link>
        )
      })}
    </Nav>
  )
}

export default ProductNav
