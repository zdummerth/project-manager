import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

import { colors } from 'styles'

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  margin: 10px 0;

  a {
    border: 1px solid ${colors.brand};
    border-radius: 50px;
    padding: 5px 10px;
    margin: 5px;
    background: ${({ selected }) => selected ? colors.gradient : colors.darkGradient};
  }
`




const ProductNav = ({ collections = [], className }) => {
  // console.log('de arrya', featured)
  console.log({ collections })

  return (
    <Nav className={className}>
      {collections.map((c, index) => (
        <Link
          key={c.node.handle + index}
          href={`/collections/${c.node.handle}`}
          activeStyle={{
            background: colors.gradient,
            // border: 'none'
          }}
        >
          <a>
            {c.node.title}
          </a>
        </Link>
      ))}
    </Nav>
  )
}

export default ProductNav
