import {$host, $authHost} from './index'

export const fetchNews = async () => {
    const {data} = await $host.get('api/news')
    return data
}

export const createNews = async (formData) => {
    const {data} = await $authHost.post('api/news', formData)
    return data
}