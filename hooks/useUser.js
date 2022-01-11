import useSWR from 'swr'

const fetcher = (url) =>
    fetch(url)
        .then((r) => r.json())
        .then((data) => {
            return { user: data?.user || null }
        })

export function useUser() {
    const { data, error, mutate } = useSWR('/api/user', fetcher, { errorRetryCount: 2 })
    const user = data?.user

    console.log('user', user)

    return {
        user: error ? null : user,
        mutate
    }
}
