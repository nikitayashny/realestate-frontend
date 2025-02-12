import {$host, $authHost} from './index'

export const countNewMessages = async (senderId, recipientId) => {
    const {data} = await $authHost.get("/messages/" + senderId + "/" + recipientId + "/count")
    return data
}

export const findChatMessages = async (senderId, recipientId) => {
    const {data} = await $authHost.get("/messages/" + senderId + "/" + recipientId)
    return data
}

export const findChatMessage = async (id) => {
    const {data} = await $authHost.get("/messages/" + id)
    return data
}