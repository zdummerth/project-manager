import React from 'react'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import { getAllPosts } from 'lib/api'
import StoryListing from 'components/stories/Listing'



const Container = styled(Flex)`
  width: 100%;
`

export default function Home({ allPosts }) {

  console.log({ allPosts })
  return (
    <Container>
      <StoryListing stories={allPosts} />
    </Container>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'tags',
    // 'content',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
