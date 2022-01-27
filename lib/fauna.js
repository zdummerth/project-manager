import faunadb, { Cos } from 'faunadb'
import { v4 as uuidv4 } from 'uuid';
const {
    Let,
    Call,
    Function,
    Create,
    Update,
    CurrentIdentity,
    Intersection,
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
    Lambda,
    Foreach,
    Delete,
    Do
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

export const createProject = async ({ userId, name, secret }) => await queryFaunaGraphql({
    variables: {
        userId,
        name
    },
    secret,
    query: `mutation($userId: ID! $name: String) {
        createProject(data: {
          manager: {
            connect: $userId
          }
          name: $name
        }) {
          _id
          name
        }
      }`
})

export const getAllUsers = async (secret) => await queryFaunaGraphql({
    secret,
    query: `query {
        allUsers {
          data {
            _id
            handle
          }
        }
      }`
})

export const createInvite = async ({ fromId, toId, projectId, secret }) => await queryFaunaGraphql({
    variables: {
        fromId, toId, projectId,
    },
    secret,
    query: `mutation($fromId: ID! $toId: ID! $projectId: ID!) {
        createInvite(data: {
          project: {
            connect: $projectId
          }
          to: {
            connect: $toId
          }
          from: {
            connect: $fromId
          }
          accepted: false
        }) {
          from {
              handle
          }
          to {
              handle
          }
          project {
              name
          }
        }
      }`
})

export const deleteInvite = async ({ id, secret }) => await queryFaunaGraphql({
    variables: {
        id,
    },
    secret,
    query: `mutation($id: ID!) {
        deleteInvite(id: $id) {
          _id
        }
      }`
})

export const sendInvites = async ({ toIds, projectId, secret }) => {
    // const client = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY })
    const client = new faunadb.Client({ secret })
    return await client.query(
        Do(
            Map(
                toIds,
                Lambda(
                    "toId",
                    Let(
                        {
                            inviteDoc: Create(Collection("Invite"), {
                                data: {
                                    project: Ref(Collection("Project"), projectId),
                                    to: Ref(Collection("User"), Var("toId")),
                                    from: Select(["data", "user"], Get(CurrentIdentity()))
                                }
                            }),
                            toRef: Select(["data", "to"], Var("inviteDoc")),
                            toDoc: Get(Var("toRef")),
                            fromRef: Select(["data", "from"], Var("inviteDoc")),
                            fromDoc: Get(Var("fromRef")),
                            projectRef: Select(["data", "project"], Var("inviteDoc")),
                            projectDoc: Get(Var("projectRef")),
                        },
                        {
                            _id: Select(["ref", "id"], Var("toDoc")),
                            project: {
                                name: Select(["data", "name"], Var("projectDoc")),
                                _id: Select(["ref", "id"], Var("projectDoc")),
                            },
                            to: {
                                handle: Select(["data", "handle"], Var("toDoc")),
                                _id: Select(["ref", "id"], Var("toDoc")),
                            },
                            from: {
                                handle: Select(["data", "handle"], Var("fromDoc")),
                                _id: Select(["ref", "id"], Var("fromDoc")),
                            }
                        }
                    )
                )
            )
        )
    )
}

export const acceptInvites = async (ids, secret) => {
    // const client = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY })
    const client = new faunadb.Client({ secret })
    return await client.query(
        Do(
            Map(
                ids,
                Lambda(
                    "inviteId",
                    Let(
                        {
                            inviteRef: Ref(Collection("Invite"), Var("inviteId")),
                            inviteDoc: Get(Var("inviteRef")),
                            projectRef: Select(["data", "project"], Var("inviteDoc")),
                            projectDoc: Get(Var("projectRef")),
                            newProjectMember: Create(Collection("project_member"), {
                                data: {
                                    projectID: Var("projectRef"),
                                    userID: Select(["data", "user"], Get(CurrentIdentity()))
                                }
                            }),
                            deletedInvite: Delete(Var("inviteRef")),
                        },
                        {
                            name: Select(["data", "name"], Var("projectDoc")),
                            _id: Select(["ref", "id"], Var("projectDoc"))
                        }
                    )
                )
            )
        )
    )
}

export const getInvitesByAccount = async (secret) => {
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
                        Match(Index("invites_search_to"), Var("userRef")),
                        Match(Index("invites_search_from"), Var("userRef")),
                    )
                ),
                Lambda(
                    "invite",
                    Let(
                        {
                            invite: Get(Var("invite")),
                            projectDoc: Get(Select(["data", "project"], Var("invite"))),
                            fromDoc: Get(Select(["data", "from"], Var("invite"))),
                            toDoc: Get(Select(["data", "to"], Var("invite"))),
                        },
                        {
                            project: {
                                _id: Select(["ref", "id"], Var("projectDoc")),
                                name: Select(["data", "name"], Var("projectDoc")),
                            },
                            to: {
                                handle: Select(["data", "handle"], Var("toDoc")),
                                _id: Select(["ref", "id"], Var("toDoc")),
                            },
                            from: {
                                handle: Select(["data", "handle"], Var("fromDoc")),
                                _id: Select(["ref", "id"], Var("fromDoc")),
                            },
                            _id: Select(["ref", "id"], Var("invite"))
                        }
                    )
                )
            )
        )
    )
}

export const findProjectByID = async ({ id, secret }) => await queryFaunaGraphql({
    variables: {
        id
    },
    secret,
    query: `query($id: ID!) {
        findProjectByID(id: $id) {
          _id
          name
          manager {
            _id
            handle
          }
          members {
            data {
              _id
              handle
            }
          }
          tasks {
            data {
              _id
              name
              status
              assignedTo {
                data {
                  _id
                  handle
                }
              }
            }
          }
        }
      }
      `
})

export const findUsersByProject = async ({ id, secret }) => await queryFaunaGraphql({
    variables: {
        id
    },
    secret,
    query: `query($id: ID!) {
        findUsersByProject: findProjectByID(id: $id) {
          manager {
            _id
            handle
          }
          members {
            data {
              _id
              handle
            }
          }
        }
      }
      `
})

export const findUserByID = async (id, secret) => await queryFaunaGraphql({
    variables: {
        id
    },
    secret,
    query: `query($id: ID!) {
        findUserByID(id: $id) {
          _id
          handle
        }
      }
      `
})

export const updateUserHandle = async (id, handle, secret) => await queryFaunaGraphql({
    variables: {
        id,
        handle
    },
    secret,
    query: `mutation($id: ID! $handle: String) {
        updateUserHandle: updateUser(id: $id data: {
          handle: $handle
        }) {
          _id
          handle
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
          status: todo
          name: $name
        }) {
          _id
          name
          status
          project {
              _id
              name
          }
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
                    "project",
                    Let(
                        {
                            project: Get(Var("project")),
                            managerDoc: Get(Select(["data", "manager"], Var("project")))
                        },
                        {
                            name: Select(["data", "name"], Var("project")),
                            manager: {
                                handle: Select(["data", "handle"], Var("managerDoc")),
                                _id: Select(["ref", "id"], Var("managerDoc")),
                            },
                            _id: Select(["ref", "id"], Var("project"))
                        }
                    )
                )
            )
        )
    )
}

export const getTasksByAccount = async ({ status, projectId, secret }) => {
    // const client = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY })
    console.log('get tasks status', status)
    console.log('get tasks project id:', projectId)

    const client = new faunadb.Client({ secret })
    return await client.query(
        Let(
            {
                accountDoc: Get(CurrentIdentity()),
                userRef: Select(["data", "user"], Var("accountDoc"))
            },
            Map(
                Paginate(
                    projectId !== 'all' ? (
                        Intersection(
                            Match(Index("task_assignedTo_by_user"), Var("userRef")),
                            Match(Index("project_tasks_by_project"), Ref(Collection("Project"), projectId)),
                            // Match(Index("tasks_search_status"), status)
                        )
                    ) : (
                        Intersection(
                            Match(Index("task_assignedTo_by_user"), Var("userRef")),
                            // Match(Index("tasks_search_status"), status)
                        )
                    )
                ),
                Lambda(
                    "t",
                    Let(
                        {
                            task: Get(Var("t")),
                            project: Get(Select(["data", "project"], Var("task"))),
                            assignedTo: Map(Paginate(
                                Match(Index("task_assignedTo_by_task"), Select("ref", Var("task"))),
                            ),
                                Lambda('user', Let(
                                    {
                                        userDoc: Get(Var("user"))
                                    },
                                    {
                                        _id: Select(["ref", "id"], Var("userDoc")),
                                        handle: Select(["data", "handle"], Var("userDoc"))
                                    }
                                ))
                            )
                        },
                        {
                            _id: Select(["ref", "id"], Var("task")),
                            name: Select(["data", "name"], Var("task")),
                            status: Select(["data", "status"], Var("task")),
                            assignedTo: Var("assignedTo"),
                            project: {
                                _id: Select(["ref", "id"], Var("project")),
                                name: Select(["data", "name"], Var("project"))
                            },
                        }
                    )
                )
            )
        )
    )
}


export const updateStatusBulk = async (ids, status, secret) => {
    // const client = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY })
    const client = new faunadb.Client({ secret })
    return await client.query(
        Do(
            Map(
                ids,
                Lambda(
                    "taskId",
                    Let(
                        {
                            updatedTask: Update(Ref(Collection("Task"), Var("taskId")), {
                                data: {
                                    status
                                }
                            }),
                        },
                        {
                            status: Select(["data", "status"], Var("updatedTask")),
                            id: Select(["ref", "id"], Var("updatedTask"))
                        }
                    )
                )
            )
        )
    )
}

export const deleteTaskBulk = async (ids, secret) => {
    // const client = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY })
    const client = new faunadb.Client({ secret })
    console.log(ids)
    return await client.query(
        Do(
            Map(
                ids,
                Lambda(
                    "taskId",
                    Let(
                        {
                            deletedTask: Delete(Ref(Collection("Task"), Var("taskId"))),
                            assignedTo: Map(Paginate(
                                Match(Index("task_assignedTo_search_by_task"), Select("ref", Var("deletedTask"))),
                            ),
                                Lambda('assignedToDoc', Delete(Var("assignedToDoc")))
                            )
                        },
                        {
                            id: Select(["ref", "id"], Var("deletedTask"))
                        }
                    )
                )
            )
        )
    )
}


//read permissions for Project Docs
// Lambda(
//     "ref",
//     Or(
//       Equals(
//         Select(["data", "user"], Get(CurrentIdentity())),
//         Select(["data", "manager"], Get(Var("ref")))
//       ),
//       ContainsValue(
//         Select(["data", "user"], Get(CurrentIdentity())),
//         Select(["data", "members"], Get(Var("ref")))
//       )
//     )
//   )

//Write Access
// Lambda(
//     ["oldData", "newData"],
//     And(
//       Equals(
//         Select(["data", "user"], Get(CurrentIdentity())),
//         Select(["data", "manager"], Var("oldData"))
//       ),
//       Equals(
//         Select(["data", "manager"], Var("oldData")),
//         Select(["data", "manager"], Var("newData"))
//       )
//     )
//   )
//