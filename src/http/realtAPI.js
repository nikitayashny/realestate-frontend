import {$host, $authHost} from './index'

export const createRealt = async (formData) => {
    const { data } = await $authHost.post('api/realt/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

export const fetchRealts = async (limit, page, selectedType, selectedDealType, userId) => {
    const { data } = await $host.get('api/realt', {
        params: {
            limit,
            page,
            selectedType,
            selectedDealType,
            userId
        }
    });
    return data;
}

export const fetchUsersRealts = async (id) => {
    const { data } = await $host.get(`api/user/realts/${id}`);
    return data;
}

export const fetchOneRealt = async (id) => {
    const {data} = await $host.get('api/realt/' + id)
    return data
}

export const deleteRealt = async (id) => {
    const {data} = await $authHost.post(`api/realt/delete/${id}`)
    return data
}

export const fetchFavorites = async (id) => {
    const {data} = await $authHost.get(`api/favorite/${id}`)
    return data
}

export const addToFavorites = async (params) => {
    const {data} = await $authHost.post(`api/favorite/add`, params)
    return data
}

export const deleteFromFavorites = async (params) => {
    const {data} = await $authHost.post(`api/favorite/delete`, params)
    return data
}