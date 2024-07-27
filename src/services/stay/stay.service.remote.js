import { httpService } from '../http.service'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter
    // addStayMsg
}

async function query(filterBy = getDefaultFilter()) {
    return httpService.get(`stay`, filterBy)
}

function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay)
    } else {
        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

function getDefaultFilter() {
    return {
        txt: '',
        checkIn: '',
        checkOut: '',
        guest: { adult: 0, chidren: 0, infant: 0, pet: 0, capacity: 0 },
        label: '',
        type: '',
        minPrice: 40,
        maxPrice: 13000,

    }
}

// async function addStayMsg(stayId, txt) {
//     const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
//     return savedMsg
// }