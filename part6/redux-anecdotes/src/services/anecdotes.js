import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (id) => {
    const returnedObject = await axios.get(`${baseUrl}/${id}`)
    // console.log(returnedObject)
    const response = await axios.put(`${ baseUrl }/${id}`, {...(returnedObject.data), votes: returnedObject.data.votes + 1})
    return response.data
}

export default { getAll, createNew, update }