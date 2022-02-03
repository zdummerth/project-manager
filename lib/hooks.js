import useSWR, { useSWRConfig } from 'swr'
import { useState } from 'react'


const fetcher = (url) =>
    fetch(url).then((r) => r.json())

const fetchest = (url, method, body) => fetch(url, {
    method,
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(body)
}).then(res => res.json())


export function useProjects({ userId }) {
    const { data, error, mutate } = useSWR(['/api/projects', userId], fetcher, { errorRetryCount: 2 })
    const { mutate: globalMutate } = useSWRConfig()
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
                // console.log('new project: ', response)
                setUpdating({
                    ...updating,
                    error: null,
                    creating: false
                })

                return [...prev, response]
            } catch (e) {
                console.log('create project error: ', e)
                setUpdating({
                    error: e,
                    ids: [],
                    creating: false
                })
                return prev
            }
        })
    }

    const deleteProject = async (id) => {
        await mutate(async prev => {
            console.log('cached projects', prev)
            setUpdating({
                ...updating,
                error: null,
                ids: [id]
            })
            try {
                const response = await fetchest(`/api/fauna/project/${id}`, 'DELETE')

                // console.log('delete project response: ', response)
                setUpdating({
                    ...updating,
                    error: null,
                    ids: [],
                })

                return prev.filter(p => p._id !== response._id)
            } catch (e) {
                console.log('delete project error: ', e)
                setUpdating({
                    error: e,
                    ids: [],
                    creating: false
                })
                return prev
            }
        })
        await globalMutate('/api/fauna/invites')
    }
    console.log('projects data', data, error)

    return {
        projects: error ? [] : data,
        loading: !data && !error,
        mutate,
        createProject,
        deleteProject,
        updating
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

                const newStuff = {
                    ...prev,
                    tasks: {
                        data: [
                            ...prev.tasks.data, response
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
                console.log('create task error: ', e)

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

                const newStuff = {
                    ...prev,
                    tasks: {
                        data: prev.tasks.data.filter(pt => pt._id !== response._id)
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
                console.log('delete task error: ', e)

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

                const returnedTasks = prev.tasks.data.map(pt => {
                    const isUpdated = response._id === pt._id
                    return isUpdated ? response : pt
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
                console.log('update task error: ', e)

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
                // console.log('new cache: ', newCache)
                setUpdating({
                    ...updating,
                    error: null,
                    creating: false
                })

                return {
                    ...prev,
                    title: response.title
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

export function useProjectMutations(projectId) {
    const { mutate: globalMutate } = useSWRConfig()

    const { data, error, mutate } = useSWR(`/api/fauna/project/${projectId}`, fetcher, { errorRetryCount: 2 })
    const [updating, setUpdating] = useState({
        ids: [],
        error: null,
        creating: false
    })

    const createTask = async (title, status) => {
        globalMutate(`/api/fauna/project/${projectId}`, async prev => {
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

                const newStuff = {
                    ...prev,
                    tasks: {
                        data: [
                            ...prev.tasks.data, response
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
                console.log('create task error: ', e)

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
        globalMutate(`/api/fauna/project/${projectId}`, async prev => {
            console.log('cached projects', prev)
            setUpdating({
                ...updating,
                error: null,
                creating: true
            })
            try {
                const response = await fetchest(`/api/fauna/task/${id}`, 'DELETE')

                const newStuff = {
                    ...prev,
                    tasks: {
                        data: prev.tasks.data.filter(pt => pt._id !== response._id)
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
                console.log('delete task error: ', e)

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
        globalMutate(`/api/fauna/project/${projectId}`, async prev => {
            console.log('cached projects', prev)
            setUpdating({
                ...updating,
                error: null,
                creating: true
            })
            try {
                const response = await fetchest(`/api/fauna/task/${id}`, 'PUT', data)

                const returnedTasks = prev.tasks.data.map(pt => {
                    const isUpdated = response._id === pt._id
                    return isUpdated ? response : pt
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
                console.log('update task error: ', e)

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
        globalMutate(`/api/fauna/project/${projectId}`, async prev => {
            console.log('cached projects', prev)
            setUpdating({
                ...updating,
                error: null,
                creating: true
            })
            try {
                const response = await fetchest(`/api/fauna/project/${projectId}`, 'PUT', { title })
                // console.log('new cache: ', newCache)
                setUpdating({
                    ...updating,
                    error: null,
                    creating: false
                })

                return {
                    ...prev,
                    title: response.title
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

export function useTasks({ userId }) {
    const { data, error, mutate } = useSWR(['/api/tasks', userId], fetcher, { errorRetryCount: 2 })
    const { mutate: globalMutate } = useSWRConfig()
    const [updating, setUpdating] = useState({
        ids: [],
        error: null,
        creating: false
    })

    const createTask = async (title) => {
        return mutate(async prev => {
            console.log('cached task', prev)
            setUpdating({
                ...updating,
                error: null,
                creating: true
            })
            try {
                const response = await fetchest('/api/fauna/task/create', 'POST', {
                    title
                })
                // console.log('new project: ', response)
                setUpdating({
                    ...updating,
                    error: null,
                    creating: false
                })

                return [...prev, response]
            } catch (e) {
                console.log('create task error: ', e)
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
        await mutate(async prev => {
            console.log('cached task', prev)
            setUpdating({
                ...updating,
                error: null,
                ids: [id]
            })
            try {
                const response = await fetchest(`/api/fauna/task/${id}`, 'DELETE')

                // console.log('delete project response: ', response)
                setUpdating({
                    ...updating,
                    error: null,
                    ids: [],
                })

                return prev.filter(p => p._id !== response._id)
            } catch (e) {
                console.log('delete task error: ', e)
                setUpdating({
                    error: e,
                    ids: [],
                    creating: false
                })
                return prev
            }
        })
    }
    console.log('task data', data, error)

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

                const returnedTasks = prev.map(pt => {
                    const isUpdated = response._id === pt._id
                    return isUpdated ? response : pt
                })

                // console.log('new cache: ', newCache)
                setUpdating({
                    ...updating,
                    error: null,
                    creating: false
                })

                return returnedTasks
            } catch (e) {
                console.log('update task error: ', e)

                setUpdating({
                    error: e,
                    ids: [],
                    creating: false
                })
                return prev
            }
        })
    }

    return {
        task: data,
        loading: !data && !error,
        mutate,
        createTask,
        deleteTask,
        updateTask,
        updating
    }
}

export function useInvites() {
    const { data, error, mutate } = useSWR('/api/fauna/invites', fetcher, { errorRetryCount: 2 })

    // console.log('invites data', data)
    const [updating, setUpdating] = useState({
        updating: '',
        error: null
    })

    const acceptInvite = async (id) => {
        return mutate(async prev => {
            console.log('cached user', prev)
            setUpdating({
                updating: id,
                error: null,
            })
            try {
                const response = await fetchest(`/api/fauna/invite/${id}`, 'PUT')

                console.log('new project', response)

                setUpdating({
                    updating: '',
                    error: null,
                })
                return {
                    ...prev,
                    receivedInvites: {
                        data: prev.receivedInvites.data.filter(prevInvite => id !== prevInvite._id)
                    }
                }
            } catch (e) {
                setUpdating({
                    updating: '',
                    error: e,
                })
                return prev
            }
        }, false)
    }

    const createInvite = async (toId, projectId) => {
        return mutate(async prev => {
            setUpdating({
                updating: true,
                error: null,
            })
            try {
                const response = await fetch('/api/fauna/invite/create', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        toId,
                        projectId
                    })
                })

                console.log('sent invites', response)

                setUpdating({
                    updating: false,
                    error: null,
                })
                return [...response, ...prev]
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
        mutate(async prev => {
            setUpdating({
                updating: id,
                error: null,
            })
            try {
                const response = await fetchest(`/api/fauna/invite/${id}`, 'DELETE')

                const deletedInvite = await response.json()
                console.log('delete invite', deletedInvite)
                const newInv = prev.filter(p => p._id !== deletedInvite._id)

                setUpdating({
                    updating: '',
                    error: null,
                })
                return newInv
            } catch (e) {
                setUpdating({
                    updating: '',
                    error: e,
                })
                return prev
            }
        })

    }

    return {
        invites: data,
        loading: !data && !error,
        mutate,
        acceptInvite,
        updating: updating.updating,
        createInvite,
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

    // console.log(' all user data', data)

    return {
        users: data,
        loading: !data && !error,
        error
    }
}