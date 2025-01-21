import {$host, $authHost} from './index'

export const fetchRealts = async (page, limit) => {
    const { data } = await $host.get('api/realts', { params: {page, limit} })
    return data;
}