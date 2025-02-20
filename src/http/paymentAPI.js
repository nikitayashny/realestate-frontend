import {$host, $authHost} from './index'

export const paymentCheckout = async (params) => {
    const {data} = await $authHost.post('payment/checkout', params)
    return data
}