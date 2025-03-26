import {$host, $authHost} from './index'

export const addToFavorites = async (id) => {
    const {data} = await $authHost.post(`api/favorites/` + id)
    try {
        await likeRealt(id)
    } catch(e) {
        alert(e)
    }
    return data
}

export const deleteFromFavorites = async (id) => {
    const {data} = await $authHost.delete(`api/favorites/` + id)
    return data
}

export const createRealt = async (formData) => {
    const { data } = await $authHost.post('api/realts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

export const fetchFavorites = async () => {
    const {data} = await $authHost.get(`api/favorites`)
    return data
}

export const fetchRealts = async (page, limit, dealTypeId, typeId, roomsCount, maxPrice, sortType, repair, floor, city, minArea, street) => {
    const { data } = await $host.get('api/realts', { params: {page, limit, dealTypeId, typeId, roomsCount, maxPrice, sortType, repair, floor, city, minArea, street} })
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

export const likeRealt = async (id) => {
    await $authHost.post(`api/realts/like/${id}`);
}