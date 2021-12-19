import { useRouter } from 'next/router'
import faunadb from 'faunadb'
import Image from 'next/image'
// import { getAllPosts } from 'lib/api'
// import markdownToHtml from 'lib/markdownToHtml'
import Flex from 'components/shared/Flex'
import Title from 'components/shared/Title'
import styled from 'styled-components'
import CommentForm from 'components/forms/comments/index'

const client = new faunadb.Client({ secret: process.env.TESTING_ADMIN_KEY })
const q = faunadb.query

const Container = styled(Flex)`
    width: 100%;
    padding: 8px;
`

const Content = styled.div`
    font-size: 18px;
    line-height: 1.5;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`

export default function Post({ post, morePosts, preview }) {
    const router = useRouter()
    // if (!router.isFallback && !post?.slug) {
    //     return <ErrorPage statusCode={404} />
    // }

    // console.log('the post', post)
    return (
        <Container dir='column' ai='center'>
            <Title>{post?.title}</Title>
            {/* <ImageContainer>
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    layout='fill'
                    objectFit='contain'
                />
            </ImageContainer> */}
            {post.content.map((c, ind) => {
                if (c.type === 'html') {
                    return (
                        <Content
                            key={ind}
                            dangerouslySetInnerHTML={{ __html: c.data }}
                        />
                    )
                }
            })}
            <CommentForm />
        </Container>
    )
}

export async function getStaticProps({ params }) {
    const post = await client.query(
        q.Call(q.Function("findPostBySlug"), params.slug)
    )

    return {
        props: {
            post: post.data
        },
    }
}

export async function getStaticPaths() {
    const slugs = await client.query(q.Call(q.Function("getAllPostSlugs")))

    return {
        paths: slugs.data.map((slug) => {
            return {
                params: {
                    slug,
                },
            }
        }),
        fallback: false,
    }
}