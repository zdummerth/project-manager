const fetcher = async ({ url, body }) => {
    let res = {}
    if (body) {
        res = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    } else {
        res = await fetch(url)
    }

    if (res.ok) {
        const data = await res.json()
        return { data }
    } else {
        console.log('res', res)
        return { error: res }
    }
}

export default fetcher