
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import { saveToStorage } from '../../services/util.service.js'


const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg
}
window.cs = stayService


async function query() {
    var stays = await storageService.query(STORAGE_KEY)
    if (!stays || !stays.length) stays = createStays()
    saveToStorage("STAY_DB", stays)
    return stays

// const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy
//     if (txt) {
//         const regex = new RegExp(filterBy.txt, 'i')
//         stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
//     }
//     if (minSpeed) {
//         stays = stays.filter(stay => stay.speed >= minSpeed)
//     }
//     if (sortField === 'vendor' || sortField === 'owner') {
//         stays.sort((stay1, stay2) =>
//             stay1[sortField].localeCompare(stay2[sortField]) * +sortDir)
//     }
//     if (sortField === 'price' || sortField === 'speed') {
//         stays.sort((stay1, stay2) =>
//             (stay1[sortField] - stay2[sortField]) * +sortDir)
//     }

//     stays = stays.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
//     return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        const stayToSave = {
            _id: stay._id,
            price: stay.price,
        }
        savedStay = await storageService.put(STORAGE_KEY, stayToSave)
    } else {
        const stayToSave = {
            price: stay.price,
        }
        savedStay = await storageService.post(STORAGE_KEY, stayToSave)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}

export function createStays() {
    return [
        {
            "_id": "s101",
            "name": "Ribeira Charming Duplex",
            "type": "House",
            "imgUrls": [],
            "price": 80.0,
            "summary": "Fantastic duplex apartment...",
            "capacity": 8,
            "amenities": [
                "TV",
                "Wifi",
                "Kitchen",
                "Smoking allowed",
                "Pets allowed",
                "Cooking basics",
                "Pool"
            ],
            "labels": [
                "Top of the world",
                "Trending",
                "Play",
                "Tropical"
            ],
            "host": {
                "_id": "u101",
                "fullname": "Davit Pok",
                "imgUrl": ""
            },
            "loc": {
                "country": "Portugal",
                "countryCode": "PT",
                "city": "Lisbon",
                "address": "17 Kombo st",
                "lat": -8.61308,
                "lng": 41.1413
            }
        },
        {
            "_id": "s102",
            "name": "Oceanfront Villa in Miami Beach",
            "type": "Villa",
            "imgUrls": [],
            "price": 300.0,
            "summary": "Luxurious villa with direct beach access...",
            "capacity": 10,
            "amenities": [
                "TV",
                "Wifi",
                "Private pool",
                "Air conditioning",
                "Free parking",
                "Beachfront"
            ],
            "labels": [
                "Luxury Retreat",
                "Beach Paradise",
                "Family Friendly"
            ],
            "host": {
                "_id": "u102",
                "fullname": "Maria Sanchez",
                "imgUrl": ""
            },
            "loc": {
                "country": "United States",
                "countryCode": "US",
                "city": "Miami Beach",
                "address": "123 Ocean Drive",
                "lat": 25.79065,
                "lng": -80.13005
            }
        },
        {
            "_id": "s103",
            "name": "Cozy Cabin in the Swiss Alps",
            "type": "Cabin",
            "imgUrls": [],
            "price": 150.0,
            "summary": "Charming cabin with breathtaking mountain views...",
            "capacity": 4,
            "amenities": [
                "Wifi",
                "Fireplace",
                "Mountain view",
                "Pet friendly",
                "Ski-in/ski-out"
            ],
            "labels": [
                "Mountain Escape",
                "Ski Adventure",
                "Romantic Getaway"
            ],
            "host": {
                "_id": "u103",
                "fullname": "Hans Müller",
                "imgUrl": ""
            },
            "loc": {
                "country": "Switzerland",
                "countryCode": "CH",
                "city": "Zermatt",
                "address": "456 Alpine Way",
                "lat": 46.0207,
                "lng": 7.7491
            }
        },
        {
            "_id": "s104",
            "name": "Historic Townhouse in Paris",
            "type": "Townhouse",
            "imgUrls": [],
            "price": 200.0,
            "summary": "Elegant townhouse in the heart of Paris...",
            "capacity": 6,
            "amenities": [
                "TV",
                "Wifi",
                "Kitchen",
                "Central heating",
                "City view",
                "Historic charm"
            ],
            "labels": [
                "City Center Gem",
                "Cultural Experience",
                "Art Lover's Haven"
            ],
            "host": {
                "_id": "u104",
                "fullname": "Sophie Dubois",
                "imgUrl": ""
            },
            "loc": {
                "country": "France",
                "countryCode": "FR",
                "city": "Paris",
                "address": "789 Rue de la Révolution",
                "lat": 48.8566,
                "lng": 2.3522
            }
        },
        {
            "_id": "s105",
            "name": "Seaside Cottage in Santorini",
            "type": "Cottage",
            "imgUrls": [],
            "price": 180.0,
            "summary": "Charming cottage overlooking the Aegean Sea...",
            "capacity": 5,
            "amenities": [
                "Wifi",
                "Balcony",
                "Ocean view",
                "Air conditioning",
                "Beach access"
            ],
            "labels": [
                "Island Retreat",
                "Sunset Views",
                "Relaxation"
            ],
            "host": {
                "_id": "u105",
                "fullname": "Nikos Papadopoulos",
                "imgUrl": ""
            },
            "loc": {
                "country": "Greece",
                "countryCode": "GR",
                "city": "Santorini",
                "address": "567 Cliffside Path",
                "lat": 36.3932,
                "lng": 25.4615
            }
        },
        {
            "_id": "s106",
            "name": "Mountain Chalet in Aspen",
            "type": "Chalet",
            "imgUrls": [],
            "price": 400.0,
            "summary": "Luxurious chalet with stunning mountain vistas...",
            "capacity": 12,
            "amenities": [
                "TV",
                "Wifi",
                "Hot tub",
                "Fireplace",
                "Ski-in/ski-out",
                "Game room"
            ],
            "labels": [
                "Ski Resort Retreat",
                "Mountain Paradise",
                "Luxury Getaway"
            ],
            "host": {
                "_id": "u106",
                "fullname": "Emily Johnson",
                "imgUrl": ""
            },
            "loc": {
                "country": "United States",
                "countryCode": "US",
                "city": "Aspen",
                "address": "345 Mountain View Drive",
                "lat": 39.1911,
                "lng": -106.8175
            }
        }
    ]
}