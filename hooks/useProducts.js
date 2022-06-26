import useSWR from 'swr'


const fetcher = (url, body) => fetch(url, {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())

export const useProductTags = () => {
  // console.log('use product tags mounted')
  const { data, error } = useSWR(['/api/shopify-graphql', {
    data: {
      query: `{
                productTags(first: 250) {
                    edges {
                        node
                    }
                }
              }`
    }
  }], fetcher)
  // console.log('use product tags mounted', data)


  // console.log('useswr data', data, error)

  return {
    data: data?.data?.productTags.edges.map(({ node }) => node),
    error,
    loading: !data && !error
  }
}


export default function useProducts(searchQuery = '') {
  console.log('search query: ', searchQuery)
  const { data, error } = useSWR(['/api/shopify-graphql', {
    data: {
      query: `query ($searchQuery: String){
                products (first: 20, query: $searchQuery) {
                  edges {
                    node {
                      id
                      title
                      descriptionHtml
                      publishedAt
                      tags
                      title
                      totalInventory
                      metafields(first: 10) {
                        edges {
                          node {
                            namespace
                            key
                            value
                          }
                        }
                      }
                      featuredImage {
                        altText
                        height
                        id
                        url
                        width
                      }
                    }
                  }
                }
              }`,
      variables: {
        searchQuery
      }
    }
  }, searchQuery], fetcher)

  console.log('useswr data', data, error)

  return {
    data: data?.data?.products.edges,
    error,
    loading: !data && !error
  }
}