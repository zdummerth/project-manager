import React from 'react'
import styled from 'styled-components'
import { dimensions } from 'styles'
import Flex from 'components/shared/Flex'
import Image from 'next/image'
import Link from 'next/link'


const ItemContainer = styled(Flex)`
  width: 100%;
  height: calc( (100vh - ${dimensions.navHeight})/2 );
  // height: 45vh;
  border: 1px solid ${({ theme }) => theme.colors.brand};
`

const ItemTitle = styled.h2``

const ImageContainer = styled.div`
  position: relative;
  width: 75%;
  height: 75%;
  // box-shadow: 1px 1px 1px ${({ theme }) => theme.colors.brand};
  // border: 1px solid ${({ theme }) => theme.colors.darkgray};
`

const data = [
  {
    image: '/images/markhor.jpg',
    title: 'The Markhor'
  },
  {
    image: '/images/a-strange-cooler.jpg',
    title: 'A Strange Cooler'
  },
]

const Item = ({ i }) => {
  const { coverImage, title, slug } = i
  console.log({ title })
  return (
    <Link href={`/posts/${slug}`}>
      <a>
        <ItemContainer dir='column' ai='center'>
          <ItemTitle>{title}</ItemTitle>
          <ImageContainer>
            <Image
              src={coverImage}
              alt={title}
              layout='fill'
              objectFit='contain'
            />
          </ImageContainer>
        </ItemContainer>
      </a>
    </Link>
  )
}


const StyledListing = styled(Flex)`
  width: 100%;
`

export default function Listing({ stories }) {
  return (
    <StyledListing dir='column' ai='stretch'>
      {stories.map((s, index) => <Item key={s.title + index} i={s} />)}
    </StyledListing>
  )
}
