import { httpService } from '../http.service';

export const stayService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
};

async function query(filterBy = getDefaultFilter(), page = 0, paginate = true) {
    const params = { ...filterBy, page, paginate };
    return httpService.get('stay', params);
}


function getById(stayId) {
    return httpService.get(`stay/${stayId}`);
}

async function remove(stayId) {
    return httpService.delete(`stay/${stayId}`);
}

async function save(stay) {
    let savedStay;
    if (stay._id) {
        savedStay = await httpService.put(`stay/${stay._id}`, stay);
    } else {
        savedStay = await httpService.post('stay', stay);
    }
    return savedStay;
}

function getDefaultFilter() {
    return {
        txt: '',
        checkIn: '',
        checkOut: '',
        guest: { adult: 0, children: 0, infant: 0, pet: 0, capacity: 0 },
        label: '',
        type: '',
        minPrice: 0,
        maxPrice: 200000,
        amenities: [],
        rooms: 0,
        bathrooms: 0,
        beds: 0,

    };
}

