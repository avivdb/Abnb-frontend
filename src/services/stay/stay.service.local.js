
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import { saveToStorage } from '../../services/util.service.js'
_createStays()
// saveToStorage("STAY_DB", stays)


const STORAGE_KEY = 'STAY_DB'

export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg,
    _createStays,
    getDefaultFilter
}
window.cs = stayService


async function query(filterBy = { txt: '', checkIn: '', checkOut: '', guest: {}, labels: [] }) {
    var stays = await storageService.query(STORAGE_KEY)
    const { txt } = filterBy
    // console.log('txt', txt)

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay => regex.test(stay.loc.country) || regex.test(stay.loc.city) || regex.test(stay.name))
    }

    // stays = stays.map(({ _id, name, price }) => ({ _id, name, price }))
    return stays
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

function getDefaultFilter() {
    return {
        txt: '',
        checkIn: '',
        checkOut: '',
        guest: { adults: 0, chidren: 0, infants: 0, pets: 0 },
        labels: [],

    }
}

function _createStays() {
    const stays = [
        {
            "_id": "s101",
            "name": "Ribeira Charming Duplex",
            "type": "House",
            "imgUrls": [
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/187504545.jpg?k=39d6bd96280fdf0f637baabe07c0f3d14acfdee635e907accbd15669c54ad2a4&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/425913783.jpg?k=5338a21d761165576794d7d61cc4e0b92d3900506fcec9d98ccbc040185e4f80&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/425913800.jpg?k=b9708cac4a5fbad41453bec339c9a518543898ed4ebf27b7b88c8ad6d3b15ff6&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/187547277.jpg?k=7ddb87226c92da609061832c93d4d558caf955fd095166bde00c23119f392eeb&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/187547277.jpg?k=7ddb87226c92da609061832c93d4d558caf955fd095166bde00c23119f392eeb&o=&hp=1",
            ],
            "price": 80.0,
            "summary": "Fantastic duplex apartment...",
            "capacity": 8,
            "amenities": [
                "TV",
                "Wifi",
                "Kitchen",
                "Smoking allowed",
                "Free parking",
                "Private pool"
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
            },
            "rating": 4.6
        },
        {
            "_id": "s102",
            "name": "Oceanfront Villa in Miami Beach",
            "type": "Villa",
            "imgUrls": ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/227796366.jpg?k=227761c5e0f87b40063fa976e5958d444bd6165a7a4f429c239ba0aa10335fa3&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/483723407.jpg?k=16ac6fe81dae270d68ed9c2bfe215f4345fc6848664b40a5444d58ebe2a45ed6&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/227796627.jpg?k=10c4d1960294565d6929bcbbe7ec0fd2fa64203d0313c3a9f14f4d285412504b&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/227796321.jpg?k=07330c5d2e5f45b52f269a18d78274efbffeace4c387da88f72caa41bb4ac098&o=&hp=1"
            ],
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
            },
            "rating": 4.8
        },
        {
            "_id": "s103",
            "name": "Cozy Cabin in the Swiss Alps",
            "type": "Cabin",
            "imgUrls": [
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/324215182.jpg?k=ede0244a0c908b99cf12f8c5b164eea323c175cbdc795231a3c178c043e3ebec&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/306416504.jpg?k=150058f0d1c96d331a9879f2f183bc415b08812c85958ccd298e26b7d007a5c2&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/306165158.jpg?k=5ea61903b87ef1f9a8d2363ffccd2fad3a7400597e178e77af00400e0abbaf1a&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/306165145.jpg?k=fbd9c0aaa4482692eea87d77d57d22a388d9b0dade056ee4bb7dcbc66a065a3c&o=&hp=1"
            ],
            "price": 150.0,
            "summary": "Charming cabin with breathtaking mountain views...",
            "capacity": 4,
            "amenities": [
                "Wifi",
                "Sea view",
                "Mountain view",
                "Free parking",
                "EV charger"
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
            },
            "rating": 4.9
        },
        {
            "_id": "s104",
            "name": "Historic Townhouse in Paris",
            "type": "Townhouse",
            "imgUrls": [
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/476255653.jpg?k=ecca71bdf59955d242816407d79ce81e2a8f4d9a3494aece2dd3e131f803bda7&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/476255639.jpg?k=00754b21b06e1df16512a2f6dca307b6f0b1ccf991abc4de8f23debd0cd4a58b&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/476255579.jpg?k=9fdf6fd73d5e9b301a8c491f9823cb479200c4158363985bd4d809d15a102bed&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/476255475.jpg?k=8cd0d76047d64d40a5d2d3bbaf4580ad9aed901e153e62ae93c72e83f8db005b&o=&hp=1"
            ],
            "price": 200.0,
            "summary": "Elegant townhouse in the heart of Paris...",
            "capacity": 6,
            "amenities": [
                "TV",
                "Wifi",
                "Kitchen",
                "Free parking",
                "Mountain view",
                "Sea view"
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
            },
            "rating": 4.3
        },
        {
            "_id": "s105",
            "name": "Seaside Cottage in Santorini",
            "type": "Cottage",
            "imgUrls": [
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/310622277.jpg?k=50bbfb3ea04d0767d423806f654ca78407b4dad682f0f11feca49765d585bbda&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/310465225.jpg?k=ef8cb7560428801b38f28217fe447d2bf93e64c8d5143f87b73192a6be24819f&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/310465084.jpg?k=506d462cee583c535a8bdd242a84305fed40026865f9cb57db0bb522ef2a9eb5&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/310464841.jpg?k=d8a1e5b60ce4aab4dd33ff33fe1cd0f58bcf55c6b7ca38e39982d410dcbb1fed&o=&hp=1"
            ],
            "price": 180.0,
            "summary": "Charming cottage overlooking the Aegean Sea...",
            "capacity": 5,
            "amenities": [
                "Wifi",
                "Balcony",
                "Sea view",
                "Air conditioning",
                "Beachfront"
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
            },
            "rating": 3.8
        },
        {
            "_id": "s106",
            "name": "Mountain Chalet in Aspen",
            "type": "Chalet",
            "imgUrls": [
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/302148267.jpg?k=9413f91c922e12282283025bac78f5442cc54872d710ada6e55c1d021d96b041&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/303769642.jpg?k=d202b5503f7a5ac8cd199ec325017178b7e01edd0199e59f533cb8fb2f1028cc&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/303769632.jpg?k=e7a919d84dbd33e8c612be977dc9162b539a85eac4f78f98625d91f3dfc4c233&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/302148183.jpg?k=9c301500cf2f30ffe625cba602ac4ec48961a2cb3efe21628b54d2bb2d498f7a&o=&hp=1"
            ],
            "price": 400.0,
            "summary": "Luxurious chalet with stunning mountain vistas...",
            "capacity": 12,
            "amenities": [
                "TV",
                "Wifi",
                "Air conditioning",
                "Smoking allowed",
                "Free parking",
                "EV charger"
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
            },
            "rating": 4.3
        }
    ]
    saveToStorage("STAY_DB", stays)
}