import React from 'react'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import Image from 'next/image'
import { getAllPosts } from 'lib/api'
import StoryListing from 'components/stories/Listing'
import DonateForm from 'components/donate/form'



const Container = styled(Flex)`
  width: 100%;
`

export default function Home({ allPosts }) {

  console.log({allPosts})
  return (
    <Container>
      <DonateForm />
      {/* <StoryListing stories={allPosts} /> */}
    </Container>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
