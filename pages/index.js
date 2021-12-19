import React from 'react'
import faunadb from 'faunadb'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
// import { getAllPosts } from 'lib/api'
import StoryListing from 'components/stories/Listing'
// import RichTextEditor from 'components/cms/RichTextEditor'



const Container = styled(Flex)`
  width: 100%;
`

export default function Home({ allPosts, all_posts }) {

  // console.log({ all_posts })
  return (
    <Container>
      <StoryListing stories={all_posts} />
    </Container>
  )
}

export async function getStaticProps() {
  const client = new faunadb.Client({ secret: process.env.TESTING_ADMIN_KEY })
  const q = faunadb.query

  const all_posts = await client.query(
    q.Call(q.Function("getAllPosts"))
  )

  return {
    props: { all_posts: all_posts.data.map(p => ({
      id: p.ref.id,
      ...p.data
    })) },
  }
}
