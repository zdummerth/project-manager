import React from 'react'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import Image from 'next/image'
import StoryListing from 'components/stories/Listing'



const Container = styled(Flex)`
  width: 100%;
`

export default function Home() {
  return (
    <Container>
      <StoryListing />
    </Container>
  )
}
