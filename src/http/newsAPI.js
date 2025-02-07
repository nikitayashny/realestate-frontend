import {$host, $authHost} from './index'

export const fetchNews = async () => {
    const {data} = await $host.get('api/posts')
    return data
}

export const createNews = async (formData) => {
    const {data} = await $authHost.post('api/posts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return data
}

export const deleteNews = async (id) => {
    const {data} = await $authHost.delete(`api/posts/${id}`)
    return data
}