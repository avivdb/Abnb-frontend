import { httpService } from '../http.service'

export const orderService = {
    query,
    getById,
    save,
    remove,
}

async function query(filterBy = {}) {
    return httpService.get(`order`, filterBy)
}

function getById(orderId) {
    return httpService.get(`order/${orderId}`)
}

async function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}
async function save(order) {
    var savedorder
    if (order._id) {
        savedorder = await httpService.put(`order/${order._id}`, order)
    } else {
        savedorder = await httpService.post('order', order)
    }
    return savedorder
}

