import { useRouter } from 'next/router'
import Image from 'next/image'
import { getPostBySlug, getAllPosts } from 'lib/api'
import markdownToHtml from 'lib/markdownToHtml'
import Flex from 'components/shared/Flex'
import Title from 'components/shared/Title'
import styled from 'styled-components'
import CommentForm from 'components/forms/comments/index'

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
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />
    }

    // console.log('the post', post)
    return (
        <Container dir='column' ai='center'>
            <Title>{post.title}</Title>
            <ImageContainer>
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    layout='fill'
                    objectFit='contain'
                />
            </ImageContainer>
            <Content
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <CommentForm />
        </Container>
    )
}

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'ogImage',
        'coverImage',
    ])
    const content = await markdownToHtml(post.content || '')

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug'])

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false,
    }
}