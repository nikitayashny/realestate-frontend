import {$host, $authHost} from './index'

export const fetchRealts = async (page, limit, dealTypeId, typeId, roomsCount, maxPrice, sortType) => {
    const { data } = await $host.get('api/realts', { params: {page, limit, dealTypeId, typeId, roomsCount, maxPrice, sortType} })
    return data;
}

export const repostRealt = async (id) => {
    await $host.post(`api/realts/repost/${id}`);
}