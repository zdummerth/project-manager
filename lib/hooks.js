import useSWR from 'swr'
import { useState } from 'react'

const fetcher = (url) =>
    fetch(url)
        .then((r) => r.json())

const fetchest = (url, method, body) => fetch(url, {
    method,
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(body)
}).then(res => res.json())


export function useProjects({ userId }) {
    const { data, error, mutate } = useSWR(['/api/projects', userId], fetcher, { errorRetryCount: 2 })

    const [updating, setUpdating] = useState({
        ids: [],
        error: null,
        creating: false
    })

    const createProject = async (title) => {
        return mutate(async prev => {
            console.log('cached projects', prev)
            setUpdating({
                ...updating,
                error: null,
                creating: true
            })
            try {
                const response = await fetchest('/api/fauna/project/create', 'POST', {
                    title
                })

                const json = await response.json()

                // console.log('new cache: ', newCache)
                setUpdating({
                    ...updating,
                    error: null,
                    creating: false
                })

                return [...prev, json]
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
    console.log('projects data', data, error)

    return {
        projects: error ? [] : data,
        loading: !data && !error,
        mutate,
        createProject
    }
}

export function useProject(projectId) {
    const { data, error, mutate } = useSWR(`/api/fauna/project/${projectId}`, fetcher, { errorRetryCount: 2 })
    const [updating, setUpdating] = useState({
        ids: [],
        error: null,
        creating: false
    })

    const createTask = async (title, status) => {
        return mutate(async prev => {
            console.log('cached projects', prev)
            setUpdating({
                ...updating,
                error: null,
                creating: true
            })
            try {
                const response = await fetchest('/api/fauna/task/create', 'POST', {
                    project: projectId,
                    title,
                    status
                })

                const newTask = await response.json()
                const newStuff = {
                    ...prev,
                    tasks: {
                        data: [
                            ...prev.tasks.data, newTask
                        ]
                    }
                }

                // console.log('new cache: ', newCache)
                setUpdating({
                    ...updating,
                    error: null,
                    creating: false
                })

                return newStuff
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

    const deleteTask = async (id) => {
        return mutate(async prev => {
            console.log('cached projects', prev)
            setUpdating({
                ...updating,
                error: null,
                creating: true
            })
            try {
                const response = await fetchest(`/api/fauna/task/${id}`, 'DELETE')

                const delTask = await response.json()
                const newStuff = {
                    ...prev,
                    tasks: {
                        data: prev.tasks.data.filter(pt => pt._id !== delTask._id)
                    }
                }

                // console.log('new cache: ', newCache)
                setUpdating({
                    ...updating,
                    error: null,
                    creating: false
                })

                return newStuff
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

    const updateTask = async (id, data) => {
        return mutate(async prev => {
            console.log('cached projects', prev)
            setUpdating({
                ...updating,
                error: null,
                creating: true
            })
            try {
                const response = await fetchest(`/api/fauna/task/${id}`, 'PUT', data)

                const updatedTask = await response.json()

                const returnedTasks = prev.tasks.data.map(pt => {
                    const isUpdated = updatedTask._id === pt._id
                    return isUpdated ? updatedTask : pt
                })
                const newStuff = {
                    ...prev,
                    tasks: {
                        data: returnedTasks
                    }
                }

                // console.log('new cache: ', newCache)
                setUpdating({
                    ...updating,
                    error: null,
                    creating: false
                })

                return newStuff
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


    const updateProjectTitle = async (title) => {
        return mutate(async prev => {
            console.log('cached projects', prev)
            setUpdating({
                ...updating,
                error: null,
                creating: true
            })
            try {
                const response = await fetchest(`/api/fauna/project/${projectId}`, 'PUT', { title })
                const updated = await response.json()
                // console.log('new cache: ', newCache)
                setUpdating({
                    ...updating,
                    error: null,
                    creating: false
                })

                return {
                    ...prev,
                    title: updated.title
                }
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

    // console.log('projects data', data)

    return {
        project: error ? [] : data,
        loading: !data && !error,
        error,
        createTask,
        deleteTask,
        updateTask,
        updating,
        updateProjectTitle
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