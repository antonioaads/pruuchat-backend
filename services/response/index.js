export const success = (res, status) => (entity) => {
    if (entity) {
        res.status(status || 200).json(entity)
    }
    return null
}

export const notFound = (res) => (entity) => {
    if (entity) {
        return entity
    }
    res.status(404).end()
    return null
}

export const successAsync = (res, status, body) => { //Body is not a entity came from a promise
    res.status(status ? status : 200).json(body ? body : {})

    return null
}

export const notFoundAsync = (res, body) => {  //Body is not a entity came from a promise

    if (body) {
        return body
    }
    res.status(404).end()
    return null
}

