import faunadb from 'faunadb'
import { v4 as uuidv4 } from 'uuid';
const {
    Let,
    Call,
    Function,
    Create,
    CurrentIdentity,
    Select,
    Var,
    Ref,
    Collection,
    Map,
    Logout,
    Tokens,
    Match,
    Index,
    Exists,
    If,
    Get,
    Paginate,
    Union,
    Lambda
} = faunadb.query

const graphqlEndpoint = `https://graphql.fauna.com/graphql`
const queryFaunaGraphql = async ({ query, variables, secret }) => {

    console.log({ variables })
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
        // console.log('json from graphql fetcher', json)
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

export const createProject = async ({ accountId, secret }) => await queryFaunaGraphql({
    variables: {
        accountId
    },
    secret,
    query: `mutation($accountId: ID!) {
        createProject(data: {
          manager: {
            connect: $accountId
          }
          name: "Project3"
        }) {
          _id
        }
      }`
})

export const findProjectByID = async ({ id, secret }) => await queryFaunaGraphql({
    variables: {
        id
    },
    secret,
    query: `query($id: ID!) {
        findProjectByID(id: $id) {
        _id
        name
        tasks {
          data {
            _id
            name
            assignedTo {
              data {
                _id
                handle
              }
            }
          }
        }
      }
    }`
})

export const createTask = async ({ project, assignedTo, name, secret }) => await queryFaunaGraphql({
    variables: {
        project, assignedTo, name
    },
    secret,
    query: `mutation($assignedTo: [ID]! $project: ID! $name: String!) {
        createTask(data: {
          assignedTo: {
            connect: $assignedTo
          }
          project:{
            connect: $project
          }
          completed: false
          name: $name
        }) {
          _id
          name
          completed
          assignedTo {
            data {
              _id
              handle
            }
          }
        }
      }`
})


export const login = async (email, secret) => {
    const client = new faunadb.Client({ secret })
    return await client.query(
        Let(
            {
                accountExists: Exists(Match(Index("unique_Account_email"), email))
            },
            If(
                Var("accountExists"),
                Let(
                    {
                        accountDoc: Get(Match(Index("unique_Account_email"), email)),
                        accountRef: Select("ref", Var("accountDoc")),
                        userRef: Select(["data", "user"], Var("accountDoc"))
                    },
                    {
                        accessToken: Select(
                            "secret",
                            Create(Tokens(), { instance: Var("accountRef") })
                        ),
                        accountId: Select(["ref", "id"], Var("accountDoc")),
                        userId: Select(["id"], Var("userRef")),
                        email: Select(["data", "email"], Var("accountDoc")),
                        isNewUser: false
                    }
                ),
                Let(
                    {

                        newAccountDoc: Create(Collection("Account"), {
                            data: {
                                email,
                                user: Select("ref", Create(Collection("User"), {
                                    data: {
                                        handle: uuidv4()
                                    }
                                }))
                            }
                        }),
                        newAccountRef: Select("ref", Var("newAccountDoc")),
                        userRef: Select(["data", "user"], Var("newAccountDoc"))
                    },
                    {
                        accessToken: Select(
                            "secret",
                            Create(Tokens(), { instance: Var("newAccountRef") })
                        ),
                        accountId: Select(["ref", "id"], Var("newAccountDoc")),
                        userId: Select(["id"], Var("userRef")),
                        email: Select(["data", "email"], Var("newAccountDoc")),
                        isNewUser: true
                    }
                )
            )
        )
    )
}

export const logout = async (secret) => {
    const client = new faunadb.Client({ secret })
    const q = faunadb.query
    return await client.query(
        Logout(true)
    )
}

export const getProjectsByAccount = async (secret) => {
    // const client = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY })
    const client = new faunadb.Client({ secret })
    return await client.query(
        Let(
            {
                accountDoc: Get(CurrentIdentity()),
                userRef: Select(["data", "user"], Var("accountDoc"))
            },
            Map(
                Paginate(
                    Union(
                        Match(Index("project_manager_by_user"), Var("userRef")),
                        Match(Index("project_member_by_user"), Var("userRef"))
                    )
                ),
                Lambda(
                    "account",
                    Let(
                        { account: Get(Var("account")) },
                        {
                            data: Select("data", Var("account")),
                            _id: Select(["ref", "id"], Var("account"))
                        }
                    )
                )
            )
        )
    )
}
