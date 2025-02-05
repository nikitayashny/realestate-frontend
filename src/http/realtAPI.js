import {$host, $authHost} from './index'

export const fetchRealts = async (page, limit, dealTypeId, typeId, roomsCount, maxPrice, sortType) => {
    const { data } = await $host.get('api/realts', { params: {page, limit, dealTypeId, typeId, roomsCount, maxPrice, sortType} })
    return data;
}

export const fetchOneRealt = async (id) => {
    const { data } = await $host.get('api/realts/' + id)
    return data;
}

export const deleteRealt = async (id) => {
    const {data} = await $authHost.delete('api/realts/' + id)
    return data
}

export const repostRealt = async (id) => {
    await $host.post(`api/realts/repost/${id}`);
}

export const viewRealt = async (id) => {
    await $host.post(`api/realts/view/${id}`);
}