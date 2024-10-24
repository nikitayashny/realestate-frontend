import {$host, $authHost} from './index'
import { jwtDecode } from "jwt-decode"

export const registration = async (firstName, lastName, login, phoneNumber, password) => {
    const {data} = await $host.post('register', {firstName, lastName, login, phoneNumber, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (login, password) => {
    const {data} = await $host.post('/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const fetchUser = async (id) => {
    const {data} = await $host.get('api/user/' + id)
    return data
}

export const fetchUsers = async () => {
    const {data} = await $authHost.get('api/users')
    return data
}

export const fetchUserFilter = async (id) => {
    const {data} = await $authHost.get(`api/userfilter/${id}`)
    return data
}

export const changeUserFilter = async (formData) => {
    const {data} = await $authHost.post('api/userfilter', formData)
    return data
}

export const banUser = async (id) => {
    const {data} = await $authHost.post('api/users/ban/' + id)
    return data
}

export const changeUser = async (id) => {
    const {data} = await $authHost.post('api/users/change/' + id)
    return data
}

export const check = async () => {
    try {
        const {data} = await $authHost.get('/api/user/auth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    }
    catch (e) {
        console.log('неавторизован')
    } 
}