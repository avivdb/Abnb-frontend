import { getRandomIntInclusive } from "../services/util.service.js"

export function StayReviews({ stay }) {

    const reviews = [
        {
            "at": "2016-06-12",
            "by": {
                "_id": "622f3407e36c59e6164fc004",
                "fullname": "Kiesha",
                "imgUrl": "https://robohash.org/10711825?set=set1",
                "id": "10711825"
            },
            "rating": 5,
            "txt": "I had a great experience working with Patty and Peter.  Both were very attentive in sorting out the booking details and following up directly when I had questions.  I rented a unit at the Westin Villas  in Maui and both the unit and property was absolutely amazing.  I think we had the best unit on the resort complete with 2 outdoor patios with direct access  to  the  beach.  I would HIGHLY recommend renting with Patty and Peter."
        },
        {
            "at": "2016-07-28",
            "by": {
                "_id": "622f3403e36c59e6164fb204",
                "fullname": "Chris",
                "imgUrl": "https://robohash.org/70072865?set=set1",
                "id": "70072865"
            },
            "rating": 4,
            "txt": "Peter quickly responded to any questions I had before, and during the trip. Will use again, highly recommend. "
        },
        {
            "at": "2016-09-11",
            "by": {
                "_id": "622f3405e36c59e6164fb703",
                "fullname": "Kim",
                "imgUrl": "https://robohash.org/71179725?set=set1",
                "id": "71179725"
            },
            "rating": 5,
            "txt": "We had the perfect location for a room, first floor right in front of the pool. The resort is beautiful, and the staff is so friendly! I enjoyed it so much, we talked about buying a timeshare ourselves."
        },
        {
            "at": "2017-01-07",
            "by": {
                "_id": "622f3404e36c59e6164fb37f",
                "fullname": "Tracy",
                "imgUrl": "https://robohash.org/65593239?set=set1",
                "id": "65593239"
            },
            "rating": 5,
            "txt": "Beautiful location. Patty & Peter were super helpful and easy to work with!"
        }
    ]

    const renderRatingStars = (rating) => {
        const stars = []
        for (let i = 1; i <= rating; i++) {
            stars.push(<span key={i}>&#9733;</span>)
        }
        return stars
    }

    return (
        <section className="stay-reviews">
            <h2>&#9733; {stay.rating} · {reviews.length} reviews</h2>
            <section className="stay-reviews-list">
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <section className="review-user-info">
                        <img src={review.by.imgUrl} alt={review.by.fullname} />
                        <section>
                        <p>{review.by.fullname}</p>
                        <p>{getRandomIntInclusive(2, 15)} years on Abnb</p>
                        </section>
                        </section>
                        <p>{review.at}</p>
                        <p>{renderRatingStars(review.rating)}</p>
                        <p className="text">{review.txt}</p>
                        <button>Show more</button>
                    </div>
                ))}
            </section>
        </section>
    )
}
