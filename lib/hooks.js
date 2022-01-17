import useSWR from 'swr'

const fetcher = (url) =>
    fetch(url)
        .then((r) => r.json())
        .then((data) => {
            return data
        })

export function useProjects({ userId }) {
    const { data, error, mutate } = useSWR(['/api/projects', userId], fetcher, { errorRetryCount: 2 })

    console.log('projects data', data)

    return {
        projects: error ? [] : data,
        mutate
    }
}

export function useProject(projectId) {
    const { data, error, mutate } = useSWR(`/api/fauna/project/${projectId}`, fetcher, { errorRetryCount: 2 })

    const createTask = async newTask => {
        return mutate(async prev => {
            console.log('cached products', prev)
            return {
                ...prev,
                tasks: {
                    data: [
                        ...prev.tasks.data,
                        newTask
                    ]
                }
            }
        }, false)
    }
    console.log('projects data', data)

    return {
        project: error ? [] : data,
        loading: !data && !error,
        error,
        createTask
    }
}
