
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import { saveToStorage } from '../../services/util.service.js'
import { loadFromStorage } from '../../services/util.service.js'

const STORAGE_KEY = 'STAY_DB'
_createStays()
// saveToStorage("STAY_DB", stays)



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


async function query(filterBy = { txt: '', checkIn: '', checkOut: '', guest: { adult, children }, labels: [] }) {
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
            name: stay.name,
            loc: {
                city: stay.city,
                country: stay.country
            },
            price: stay.price
        }
        savedStay = await storageService.put(STORAGE_KEY, stayToSave)
    } else {
        const stayToSave = {
            name: stay.name,
            loc: {
                city: stay.city,
                country: stay.country
            },
            price: stay.price,
            imgUrls: [
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/407313266.jpg?k=e55ba82e1a97dc5d0df63f03453c41756099d8c657cdc82934f65d65157e9a1f&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/407311892.jpg?k=703ea9df4d895c99490ac4025ecb42e91a9b964c25021b73378864ab1752b9f2&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/363225117.jpg?k=2c28351baceb809f007ed1e47f2e8a070dc09f25a40b8edc3523514c177bd6ed&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/367052898.jpg?k=a8daacec924be824ed66baa6fb90eddda607819c2484b73601135470655d6ddd&o=&hp=1",
                "https://cf.bstatic.com/xdata/images/hotel/max1280x900/367052778.jpg?k=54c250688224760dd891a242fc04ed7e3909750a48c5838bd0d55dcff91b65a4&o=&hp=1"
            ],
            type: "House",
            summary: "The perfect location for an ideal vacation in the capital! The AJU boutique studio is located in the heart of Jerusalem, on the historical Hillel street. A walking distance from King George and Ben Yehuda street, the Mahane Yehuda market, restaurants, bars, and public transportation. With this prime location, youll be able to explore the locals favorite go-to spots, and take tours all around the city.",
            capacity: 4,
            amenities: [
                "TV",
                "Wifi",
                "Kitchen",
                "Smoking allowed",
                "Free parking",
                "Private pool"
            ],
            labels: [
                "Top of the world",
                "Trending",
                "Play",
                "Tropical"
            ],
            host: {
                "_id": makeId(),
                "fullname": "Maria Sanchez",
                "imgUrl": ""
            },
            rating: 4.9


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
    let stays
    if (loadFromStorage(STORAGE_KEY)) stays = loadFromStorage(STORAGE_KEY)
    else {
        stays = [
            {
                "_id": "s101",
                "name": "Ribeira Charming Duplex",
                "type": "House",
                "imgUrls": [
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/187504545.jpg?k=39d6bd96280fdf0f637baabe07c0f3d14acfdee635e907accbd15669c54ad2a4&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/425913783.jpg?k=5338a21d761165576794d7d61cc4e0b92d3900506fcec9d98ccbc040185e4f80&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/425913800.jpg?k=b9708cac4a5fbad41453bec339c9a518543898ed4ebf27b7b88c8ad6d3b15ff6&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/187547277.jpg?k=7ddb87226c92da609061832c93d4d558caf955fd095166bde00c23119f392eeb&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/425913773.jpg?k=5b536c2dcf298d1b00d00075d81e27eff442ad9efe8a5f44ed617b1afbdfb131&o=&hp=1",
                ],
                "price": 80.0,
                "summary": "Have a seat on the balcony with scenic views over the historical centre. This spacious duplex inside a 17th century building is renovated in modern style with all conveniences. One bedroom, with additional sofa bed if required. Fibre internet and working desk.",
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
                "rating": 4.6,
                "guests": 7,
                "bedrooms": 5,
                "beds": 3,
                "baths": 2,
            },
            {
                "_id": "s102",
                "name": "Oceanfront Villa in Miami Beach",
                "type": "Villa",
                "imgUrls": ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/227796366.jpg?k=227761c5e0f87b40063fa976e5958d444bd6165a7a4f429c239ba0aa10335fa3&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/483723407.jpg?k=16ac6fe81dae270d68ed9c2bfe215f4345fc6848664b40a5444d58ebe2a45ed6&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/227796627.jpg?k=10c4d1960294565d6929bcbbe7ec0fd2fa64203d0313c3a9f14f4d285412504b&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/227796321.jpg?k=07330c5d2e5f45b52f269a18d78274efbffeace4c387da88f72caa41bb4ac098&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/568032801.jpg?k=e21b57658fe70b61fce9bb7b89a1db3a8060fdfd453f756fede3ec5d868275f1&o=&hp=1"
                ],
                "price": 300.0,
                "summary": "South Beach Condo/Hotel in an unbeatable location at top of Ocean Drive and Collins Avenue. A private balcony and a second Private rooftop Balcony with views of the city. Centrally located between the famous Ocean Drive and Collins Ave, this is a desirable destination for travelers from all over the world seeking Art Events + Culture, Music, Shopping, and world famous South Beach! Beach is just 2 minutes away across the street from the Condo.",
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
                "rating": 4.8,
                "guests": 2,
                "bedrooms": 3,
                "beds": 2,
                "baths": 1,
            },
            {
                "_id": "s103",
                "name": "Cozy Cabin in the Swiss Alps",
                "type": "Cabin",
                "imgUrls": [
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/324215182.jpg?k=ede0244a0c908b99cf12f8c5b164eea323c175cbdc795231a3c178c043e3ebec&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/306416504.jpg?k=150058f0d1c96d331a9879f2f183bc415b08812c85958ccd298e26b7d007a5c2&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/306165158.jpg?k=5ea61903b87ef1f9a8d2363ffccd2fad3a7400597e178e77af00400e0abbaf1a&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/306165145.jpg?k=fbd9c0aaa4482692eea87d77d57d22a388d9b0dade056ee4bb7dcbc66a065a3c&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/306165149.jpg?k=3bb814a882bbabcb58ab51b3a89e427f3e25af74b609a426266be08af6b42596&o=&hp=1"
                ],
                "price": 150.0,
                "summary": "The Nido is a structure made entirely of natural wood, 20 square meters, designed specifically for 2 people and equipped with all the comforts. It is perched on the rock, with a small solarium garden, and for a unique experience, it also has an outdoor jacuzzi tub with wood-burning stove. From every corner you have a wonderful view of Lake Como and the mountains that surround it.",
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
                "rating": 4.9,
                "guests": 8,
                "bedrooms": 6,
                "beds": 9,
                "baths": 5,
            },
            {
                "_id": "s104",
                "name": "Historic Townhouse in Paris",
                "type": "Townhouse",
                "imgUrls": [
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/476255653.jpg?k=ecca71bdf59955d242816407d79ce81e2a8f4d9a3494aece2dd3e131f803bda7&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/476255639.jpg?k=00754b21b06e1df16512a2f6dca307b6f0b1ccf991abc4de8f23debd0cd4a58b&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/476255579.jpg?k=9fdf6fd73d5e9b301a8c491f9823cb479200c4158363985bd4d809d15a102bed&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/476255475.jpg?k=8cd0d76047d64d40a5d2d3bbaf4580ad9aed901e153e62ae93c72e83f8db005b&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/476255589.jpg?k=747ce93435360800e6d85bba44a80a88b0294c0cc38ae49970f3fc6c412a9efa&o=&hp=1"
                ],
                "price": 200.0,
                "summary": "We are pleased to introduce you to our apartment. Share an authentic Parisian experience with the family. Explore the neighborhoods hidden gems by booking with us now.",
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
                "rating": 4.3,
                "guests": 2,
                "bedrooms": 1,
                "beds": 3,
                "baths": 4,
            },
            {
                "_id": "s105",
                "name": "Seaside Cottage in Santorini",
                "type": "Cottage",
                "imgUrls": [
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/310622277.jpg?k=50bbfb3ea04d0767d423806f654ca78407b4dad682f0f11feca49765d585bbda&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/310465225.jpg?k=ef8cb7560428801b38f28217fe447d2bf93e64c8d5143f87b73192a6be24819f&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/310465084.jpg?k=506d462cee583c535a8bdd242a84305fed40026865f9cb57db0bb522ef2a9eb5&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/310464841.jpg?k=d8a1e5b60ce4aab4dd33ff33fe1cd0f58bcf55c6b7ca38e39982d410dcbb1fed&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/465932543.jpg?k=9d6c4541fa23567b4da9a88b6dd907018e24975976d9ac639ccb7e87355bbb35&o=&hp=1"
                ],
                "price": 180.0,
                "summary": "Superior Suite is located in the complex of Exclusive Plan Suites in Firostefani Santorini and it is an Adults only accommodation.The breathtaking view of sparkling waters of the Aegean sea and the azur sky of Cyclades Islands is ideal for relaxing holidays in luxury. The suite also faces the amazing Caldera View offering the finest panoramic sunset view. Located close enough to the center but far enough from the crowdy places of the island.",
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
                "rating": 3.8,
                "guests": 4,
                "bedrooms": 2,
                "beds": 7,
                "baths": 2,
            },
            {
                "_id": "s106",
                "name": "Mountain Chalet in Aspen",
                "type": "Chalet",
                "imgUrls": [
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/302148267.jpg?k=9413f91c922e12282283025bac78f5442cc54872d710ada6e55c1d021d96b041&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/303769642.jpg?k=d202b5503f7a5ac8cd199ec325017178b7e01edd0199e59f533cb8fb2f1028cc&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/303769632.jpg?k=e7a919d84dbd33e8c612be977dc9162b539a85eac4f78f98625d91f3dfc4c233&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/302148183.jpg?k=9c301500cf2f30ffe625cba602ac4ec48961a2cb3efe21628b54d2bb2d498f7a&o=&hp=1",
                    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/303157419.jpg?k=583a21d616f42063ee83e3948faa0c86552df20ebbce12d0490d69dfefb68df0&o=&hp=1"
                ],
                "price": 400.0,
                "summary": "Renovation completed June 2023!  High-end designer decorated condo next to St. Regis in boutique condo building. Subzero, Wolf appliances. Heated bathroom floors. Steam shower. Beds: 1 King, 2 Twins, 1 King Sofabed. Ski locker. Fully stocked kitchen. Ski-in/hike down from Ajax to building's back entrance. Easy 5 minute walk to center of town. Enjoy Ajax mountain views from 2 sides of condo and community hot tub. Designated parking spot.",
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
                "rating": 4.3,
                "guests": 5,
                "bedrooms": 3,
                "beds": 5,
                "baths": 3,
            }
        ]
    }

    saveToStorage("STAY_DB", stays)
}