import {$host, $authHost} from './index'

// export const createType = async (type) => {
//     const {data} = await $authHost.post('api/type', type)
//     return data
// }

// export const fetchTypes = async () => {
//     const {data} = await $host.get('api/type')
//     return data
// }

// export const createBrand = async (brand) => {
//     const {data} = await $authHost.post('api/brand', brand)
//     return data
// }

// export const fetchBrands = async () => {
//     const {data} = await $host.get('api/brand')
//     return data
// }

export const createRealt = async (formData) => {
    const { data } = await $authHost.post('api/realt/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

export const fetchRealts = async () => {
    const {data} = await $host.get('api/realt')
    return data
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

// export const deleteFromBasket = async (userId, productId) => {
//     const {data} = await $authHost.delete(`api/basket/${userId}/${productId}`)
//     return data
// }

// export const getUserOrders = async (userId) => {
//     const {data} = await $authHost.get(`api/order/${userId}`)
//     return data
// }

// export const getOneUserOrder = async (userId, orderId) => {
//     const {data} = await $authHost.get(`api/order/${userId}/${orderId}`)
//     return data
// }

// export const deleteOrder = async (orderId) => {
//     const {data} = await $authHost.delete(`api/order/${orderId}`)
//     return data
// }

// export const makeOrder = async (userId) => {
//     const {data} = await $authHost.post(`api/order/${userId}`)
//     return data
// }

// export const getAllOrders = async (params) => {
//     const {data} = await $authHost.get(`api/order`, params)
//     return data
// }

// export const changeStatus = async (params) => {
//     const {data} = await $authHost.put(`api/order/`, params)
//     return data
// }

// export const getReviews = async (productId) => {
//     const {data} = await $host.get(`api/review/${productId}`)
//     return data
// }

// export const createReview = async (params) => {
//     const {data} = await $authHost.post(`api/review`, params)
//     return data
// }

// export const deleteReview = async (id, userId) => {
//     const {data} = await $authHost.delete(`api/review/${id}/${userId}`)
//     return data
// }