import React, { useState } from 'react'
import { getRandomIntInclusive } from "../services/util.service.js"

export function StayReviews({ stay }) {
    const [curReview, setCurReview] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const reviews = [
        {
            "at": "2016-06-12",
            "by": {
                "_id": "622f3407e36c59e6164fc004",
                "fullname": "Jesse",
                "imgUrl": "https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png",
                "id": "10711825"
            },
            "rating": 5,
            "txt": "I had a great experience working with Patty and Peter.  Both were very attentive in sorting out the booking details and following up directly when I had questions.  I rented a unit at the Westin Villas  in Maui and both the unit and property was absolutely amazing.  I think we had the best unit on the resort complete with 2 outdoor patios with direct access  to  the  beach.  I would HIGHLY recommend renting with Patty and Peter."
        },
        {
            "at": "2016-07-28",
            "by": {
                "_id": "622f3403e36c59e6164fb204",
                "fullname": "Mike",
                "imgUrl": "https://upload.wikimedia.org/wikipedia/en/e/ea/Mike_Ehrmantraut_BCS_S3.png",
                "id": "70072865"
            },
            "rating": 4,
            "txt": "Peter quickly responded to any questions I had before, and during the trip. Will use again, highly recommend. "
        },
        {
            "at": "2016-09-11",
            "by": {
                "_id": "622f3405e36c59e6164fb703",
                "fullname": "Skyler",
                "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStvtniRWswauECJGmrYfc4xt4Ifer55q_J6w&s",
                "id": "71179725"
            },
            "rating": 5,
            "txt": "We had the perfect location for a room, first floor right in front of the pool. The resort is beautiful, and the staff is so friendly! I enjoyed it so much, we talked about buying a timeshare ourselves."
        },
        {
            "at": "2017-01-07",
            "by": {
                "_id": "622f3404e36c59e6164fb37f",
                "fullname": "Hank",
                "imgUrl": "https://www.indiewire.com/wp-content/uploads/2019/07/BreakingBad_Hank.png",
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

    function formatDate(inputDate) {
        let parts = inputDate.split('-')
        let day = parts[0]
        let month = parts[1]
        let year = parts[2]

        let dateObj = new Date(year, month - 1, day)

        let monthName = dateObj.toLocaleString('en-US', { month: 'long' })
        let formattedDate = `${monthName} ${day}`

        return formattedDate
    }

    const onShowReview = (review) => {
        setCurReview(review)
        setShowModal(true)
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <section className="stay-reviews">
            <h2 className="stay-reviews-title">&#9733; {stay.rating} · {reviews.length} reviews</h2>
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
                        <p className="stay-reviews-sum">
                            <span className="stay-review-stars">{renderRatingStars(review.rating)}</span>
                            <span>·</span>
                            {formatDate(review.at)}
                        </p>
                        <p className="text">{review.txt}</p>
                        <button onClick={() => onShowReview(review)}>Show more</button>
                    </div>
                ))}
            </section>
            {showModal && (
                <div className="stay-reviews-modal">
                        <span className="stay-reviews-modal-close" onClick={onCloseModal}>&times;</span>
                        <section className="review-user-info">
                            <img src={curReview.by.imgUrl} alt={curReview.by.fullname} />
                            <section>
                                <p>{curReview.by.fullname}</p>
                                <p>{getRandomIntInclusive(2, 15)} years on Abnb</p>
                            </section>
                        </section>
                        <p className="stay-reviews-sum">
                            <span className="stay-review-stars">{renderRatingStars(curReview.rating)}</span>
                            <span>·</span>
                            {formatDate(curReview.at)}
                        </p>
                        <p className="text">{curReview.txt}</p>
                </div>
            )}
        </section>
    )
}