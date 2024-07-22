import { StayPreview } from "../cmps/StayPreview"
import { orderService } from "../services/order/order.service.local"


export function UserTrips() {
    
    const trips = [
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
            "isWishlist": false,
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
        }
    ]

    return (
        <section className="user-trips">
            <h1>Trips</h1>
            <ul className="user-trips-list">
                {trips.map((stay) => (
                    <li key={stay._id}>
                        <StayPreview stay={stay} />
                    </li>
                ))}
            </ul>
        </section>
    )
}