import faunadb from 'faunadb'

const graphqlEndpoint = `https://graphql.fauna.com/graphql`
const queryFaunaGraphql = async ({ query, variables, secret }) => {

    const res = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${secret}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Schema-Preview': 'partial-update-mutation'
        },
        body: JSON.stringify({
            query,
            variables
        })
    })

    // const json1 = await res.json()
    // console.log('response from graphql fetcher', res)
    if (res.status === 200) {
        const json = await res.json()
        console.log('json from graphql fetcher', json)
        if (json.errors) {
            // console.log('errors from graphql fetcher', json.errors)
            throw json.errors[0].message

        } else {
            return json.data
        }
    } else {
        throw new Error("There was an error in fetching the graphql graphqlEndpoint")
    }
}

export const createContact = async ({ email, secret }) => await queryFaunaGraphql({
    variables: {
        email
    },
    secret,
    query: `mutation($email: String!) {
      createContact( data:{
        email: $email
      }) {
        email
      }
    }`
})

export const createFormSubmission = async ({ email, name, message, secret }) => await queryFaunaGraphql({
    variables: {
        email,
        name,
        message
    },
    secret,
    query: `mutation($email: String!, $name: String!, $message: String!) {
        createFormSubmission(
          data: { email: $email, name: $name, message: $message }
        ) {
          _id
          email
          name
          message
        }
      }`
})

export const getAllFormSubmissions = async (secret) => await queryFaunaGraphql({
    secret,
    query: `query {
        allFormSubmissions {
          data {
            _id
            name
            email
            message
          }
        }
      }`
})


export const login = async (email, secret) => {
    const client = new faunadb.Client({ secret })
    const q = faunadb.query
    return await client.query(
        q.Call(q.Function("user_login"), email)
    )
}

export const logout = async (secret) => {
    const client = new faunadb.Client({ secret })
    const q = faunadb.query
    return await client.query(
        q.Call(q.Function("user_logout"))
    )
}