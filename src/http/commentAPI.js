import {$host, $authHost} from './index'

export const fetchComments = async (id) => {
    const {data} = await $host.get(`api/comments/${id}`)
    return data
}

export const createComment = async (params) => {
    const {data} = await $authHost.post('api/comments', params)
    return data
}

export const deleteComment = async (id) => {
    const {data} = await $authHost.delete(`api/comments/${id}`)
    return data
}