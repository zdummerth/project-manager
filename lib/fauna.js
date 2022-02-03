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
    Do,
    Equals,
    Abort
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

const _taskDeleteCascade = (taskRefs) => (
    Foreach(taskRefs, Lambda("taskRef", Let({},
        {
            deletedTask: Delete(Var("taskRef")),
            assignedTo: Foreach(Paginate(
                Match(Index("task_assignedTo_search_by_task"), Var("taskRef"))),
                Lambda('assignedToDoc', Delete(Var("assignedToDoc"))))
        })))
)

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

export const createProject = async ({ userId, title, secret }) => await queryFaunaGraphql({
    variables: {
        userId,
        title
    },
    secret,
    query: `mutation($userId: ID! $title: String) {
        createProject(data: {
          manager: {
            connect: $userId
          }
          title: $title
        }) {
          _id
          title
          manager {
              _id
              handle
          }
        }
      }`
})

export const getProjectsByAccount = async ({ userId, secret }) => await queryFaunaGraphql({
    variables: {
        id: userId
    },
    secret,
    query: `query($id: ID!) {
        getProjectsByAccount: findUserByID(id: $id) {
          _id
          handle
          projects {
            data {
              _id
              title
              manager {
                  _id
                  handle
              }
            }
          }
          managedProjects {
            data {
              _id
              title
              manager {
                _id
                handle
            }
            }
          }
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
          title
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
              title
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

export const deleteProjectCascade = async ({ id, secret }) => {
    // const client = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY })
    const client = new faunadb.Client({ secret })
    return await client.query(
        Let(
            {
                projectRef: Ref(Collection("Project"), id),
                tasks: Select("data", Paginate(Match(Index("project_tasks_by_project"), Var("projectRef")))),
                invites: Select("data", Paginate(Match(Index("invites_search_by_project"), Var("projectRef")))),
                projectMembers: Select("data", Paginate(Match(Index("project_member_search_by_project"), Var("projectRef")))),
            },
            Do(
                // Foreach(Var("tasks"), Lambda("taskRef", Let({},
                //     {
                //         deletedTask: Delete(Var("taskRef")),
                //         assignedTo: Foreach(Paginate(
                //             Match(Index("task_assignedTo_search_by_task"), Var("taskRef"))),
                //             Lambda('assignedToDoc', Delete(Var("assignedToDoc"))))
                //     }))),
                _taskDeleteCascade(Var("tasks")),
                Foreach(Var("invites"), Lambda("invite", Delete(Var("invite")))),
                Foreach(Var("projectMembers"), Lambda("member", Delete(Var("member")))),
                Select(["ref", "id"], Delete(Var("projectRef")))
            )
        )
    )
}

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

export const getInvites = async ({ id, secret }) => await queryFaunaGraphql({
    variables: {
        id,
    },
    secret,
    query: `query($id: ID!){
        getInvites: findUserByID(id:$id) {
          sentInvites {
            data {
              _id
              project {
                _id
                title
              }
              to {
                _id
                handle
              }
              from {
                _id
                handle
              }
            }
          }
          receivedInvites {
            data {
              _id
              project {
                _id
                title
              }
              to {
                _id
                handle
              }
              from {
                _id
                handle
              }
            }
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
        }) {
          from {
              _id
              handle
          }
          to {
              _id
              handle
          }
          project {
              _id
              title
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

export const acceptInvite = async ({ id, secret }) => {
    // const client = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY })
    const client = new faunadb.Client({ secret })
    return await client.query(
        Let(
            {
                userRef: Select(["data", "user"], Get(CurrentIdentity())),
                inviteRef: Ref(Collection("Invite"), id),
                inviteDoc: Get(Var("inviteRef")),
                toRef: Select(["data", "to"], Var("inviteDoc")),
                projectRef: Select(["data", "project"], Var("inviteDoc")),
                projectDoc: Get(Var("projectRef"))
            },
            If(
                Equals(Var("userRef"), Var("toRef")),
                Do(
                    Create(Collection("project_member"), {
                        data: {
                            projectID: Var("projectRef"),
                            userID: Var("userRef")
                        }
                    }),
                    Delete(Var("inviteRef")),
                    {
                        name: Select(["data", "title"], Var("projectDoc")),
                        _id: Select(["ref", "id"], Var("projectDoc"))
                    }
                ),
                Abort("Unauthorized to accept invite")
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

export const createTask = async ({ project, status, title, secret }) => await queryFaunaGraphql({
    variables: {
        project,
        status,
        title
    },
    secret,
    query: `mutation($project: ID!, $title: String!, $status: TaskStatus) {
        createTask(
          data: { project: { connect: $project }, status: $status, title: $title }
        ) {
          _id
          title
          status
          assignedTo {
            data {
              _id
              handle
            }
          }
        }
      }`
})

export const deleteTask = async ({ id, secret }) => await queryFaunaGraphql({
    variables: {
        id
    },
    secret,
    query: `mutation($id: ID!) {
        deleteTask(id: $id) {
        _id
        title
      }
    }`
})

export const deleteTaskCascade = async ({ id, secret }) => {
    // const client = new faunadb.Client({ secret: process.env.FAUNA_SERVER_KEY })
    const client = new faunadb.Client({ secret })
    return await client.query(
        Let(
            {
                taskRef: Ref(Collection("Task"), id),
                assignedTo: Select(
                    "data",
                    Paginate(Match(Index("task_assignedTo_search_by_task"), Var("taskRef")))
                )
            },
            Do(
                Foreach(
                    Var("assignedTo"),
                    Lambda("assignedToRef", Delete(Var("assignedToRef")))
                ),
                Select(["ref", "id"], Delete(Var("taskRef")))
            )
        )
    )
}

export const updateTask = async ({ id, data, secret }) => await queryFaunaGraphql({
    variables: {
        id,
        data
    },
    secret,
    query: `mutation($id: ID! $data: TaskInput!) {
        updateTask(id: $id data: $data) {
        _id
        title
        status
        assignedTo {
          data {
            _id
            handle
          }
        }
      }
    }`
})

export const updateProjectTitle = async ({ id, title, secret }) => await queryFaunaGraphql({
    variables: {
        id,
        title
    },
    secret,
    query: `mutation($id: ID!, $title: String) {
        updateProjectTitle: updateProject(id: $id, data: { title: $title }) {
          _id
          title
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