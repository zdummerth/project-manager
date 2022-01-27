import useSWR from 'swr'
import { useState } from 'react'

const fetcher = (url) =>
    fetch(url)
        .then((r) => r.json())
// .then((data) => {
//     // console.log('revalidated')
//     return data
// })

const postFetcher = (url, body) => fetch(url, {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(body)
}).then(res => res.json())

export function useProjects({ userId }) {
    const { data, error, mutate } = useSWR(['/api/projects', userId], fetcher, { errorRetryCount: 2 })

    console.log('projects data', data, error)

    return {
        projects: error ? [] : data,
        mutate
    }
}

export function useInvites() {
    const { data, error, mutate } = useSWR(['/api/fauna/invites'], fetcher, { errorRetryCount: 2 })

    // console.log('invites data', data)
    const [updating, setUpdating] = useState({
        updating: false,
        error: null
    })

    const acceptInvites = async (ids) => {
        return mutate(async prev => {
            console.log('cached user', prev)
            setUpdating({
                updating: true,
                error: null,
            })
            try {
                const response = await fetch('/api/fauna/invite/accept', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        ids
                    })
                })

                const newProjects = await response.json()
                console.log('updated user', newProjects)

                setUpdating({
                    updating: false,
                    error: null,
                })
                return prev.filter(prevInvite => !ids.includes(prevInvite._id))
            } catch (e) {
                setUpdating({
                    updating: false,
                    error: e,
                })
                return prev
            }
        }, false)
    }

    const sendInvites = async (toIds, projectId) => {
        return mutate(async prev => {
            setUpdating({
                updating: true,
                error: null,
            })
            try {
                const response = await fetch('/api/fauna/invite/send', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        toIds,
                        projectId
                    })
                })

                const sentInvites = await response.json()
                console.log('sent invites', sentInvites)

                setUpdating({
                    updating: false,
                    error: null,
                })
                return [...sentInvites, ...prev]
            } catch (e) {
                setUpdating({
                    updating: false,
                    error: e,
                })
                return prev
            }
        })

    }

    const deleteInvite = async (id) => {
        return mutate(async prev => {
            setUpdating({
                updating: true,
                error: null,
            })
            try {
                const response = await fetch('/api/fauna/invite/delete', {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        id
                    })
                })

                const deletedInvite = await response.json()
                console.log('delete invite', deletedInvite)

                setUpdating({
                    updating: false,
                    error: null,
                })
                return prev.filter(p => p._id !== deletedInvite._id)
            } catch (e) {
                setUpdating({
                    updating: false,
                    error: e,
                })
                return prev
            }
        })

    }
    return {
        invites: data ? data : [],
        loading: !data && !error,
        mutate,
        acceptInvites,
        updating: updating.updating,
        sendInvites,
        deleteInvite
    }
}


const tasksFetcher = (url, userId, projectId, status) => fetch(url, {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        userId, projectId, status
    })
}).then(res => res.json())

export function useTasks({ status, userId, projectId, setSelectedTasks }) {

    const projId = projectId ? projectId : 'all'
    // console.log('proj id: ', projId)

    const { data, error, mutate } = useSWR([`/api/fauna/tasks`, userId, projId, status], tasksFetcher)

    // console.log('tasks data', data)

    const [updating, setUpdating] = useState({
        ids: [],
        creating: false,
        error: null
    })

    const createTask = async text => {
        return mutate(async prev => {
            console.log('cached products', prev)
            setUpdating({
                ...updating,
                error: null,
                creating: true
            })
            try {
                const response = await fetch('/api/fauna/task/create', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        project: projectId,
                        name: text,
                    })
                })

                const newTask = await response.json()
                const newCache = [...prev, newTask]

                console.log('new cache: ', newCache)
                setUpdating({
                    ...updating,
                    error: null,
                    creating: false
                })
                return newCache
            } catch (e) {
                setUpdating({
                    error: e,
                    ids: [],
                    creating: false
                })
                return prev
            }
        })
    }

    const updateStatusBulk = async (status, ids) => {

        return mutate(async prev => {
            console.log('cached tasks', prev)
            setUpdating({
                ...updating,
                error: null,
                ids
            })
            try {
                const response = await fetch('/api/fauna/task/update-status-bulk', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        status,
                        ids,
                    })
                })

                const updatedTasks = await response.json()
                const updatedTasksIds = updatedTasks.map(t => t.id)

                // const newTasks = prev.filter(pt => !updatedTasksIds.includes(pt._id))
                const returnedTasks = prev.map(pt => {
                    const isUpdated = updatedTasks.find(el => el.id === pt._id)
                    if (isUpdated) {
                        return {
                            ...pt,
                            status: isUpdated.status
                        }
                    } else {
                        return pt
                    }
                })
                setSelectedTasks([])

                setUpdating({
                    ...updating,
                    error: null,
                    ids: []
                })
                return returnedTasks
                // return newTasks
            } catch (e) {
                setUpdating({
                    ...updating,
                    error: e,
                    ids: []
                })
                return prev
            }
        }, false)
    }

    const deleteTaskBulk = async (ids) => {
        return mutate(async prev => {
            // console.log('cached products', prev)
            setUpdating({
                ...updating,
                error: null,
                ids
            })
            try {
                const response = await fetch('/api/fauna/task/delete-task-bulk', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        ids,
                    })
                })

                const deletedTasks = await response.json()
                const returnedTasks = prev.filter(pt => {
                    return !deletedTasks.find(dt => dt.id === pt._id)
                })
                setUpdating({
                    ...updating,
                    error: null,
                    ids: []
                })
                setSelectedTasks([])
                return returnedTasks
            } catch (e) {
                console.log('deleting error')
                setUpdating({
                    ...updating,
                    error: e,
                    ids: []
                })
                return prev
            }
        }, false)
    }
    // console.log('projects data', data)

    return {
        tasks: error ? [] : data,
        loading: !data && !error,
        error,
        createTask,
        updateStatusBulk,
        deleteTaskBulk,
        updating
    }
}

export function useProject(projectId, setSelectedTasks) {
    const { data, error, mutate } = useSWR(`/api/fauna/project/${projectId}`, fetcher, { errorRetryCount: 2 })
    const [updating, setUpdating] = useState({
        ids: [],
        error: null,
        creating: false
    })

    // console.log('projects data', data)

    return {
        project: error ? [] : data,
        loading: !data && !error,
        error,
    }
}

export function useUser() {
    const { data, error, mutate } = useSWR(['/api/user'], fetcher, { errorRetryCount: 2 })

    // console.log('user data', data)

    const [updating, setUpdating] = useState({
        updating: false,
        error: null
    })

    const updateHandle = async (handle) => {
        return mutate(async prev => {
            console.log('cached user', prev)
            setUpdating({
                updating: true,
                error: null,
            })
            try {
                const response = await fetch('/api/user', {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        handle
                    })
                })

                const updatedUser = await response.json()
                console.log('updated user', updatedUser)

                setUpdating({
                    updating: false,
                    error: null,
                })
                return updatedUser
            } catch (e) {
                setUpdating({
                    updating: false,
                    error: e,
                })
                return prev
            }
        }, false)
    }

    return {
        user: data,
        loading: !data && !error,
        mutate,
        updateHandle,
        updating: updating.updating
    }
}

export function useAllUsers() {
    const { data, error, mutate } = useSWR(['/api/users'], fetcher, { errorRetryCount: 2 })

    console.log(' all user data', data)

    return {
        users: data,
        loading: !data && !error,
        error
    }
}