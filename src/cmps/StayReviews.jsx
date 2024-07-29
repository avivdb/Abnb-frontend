import React, { useState } from 'react'
import { getRandomIntInclusive } from "../services/util.service.js"
import userimg from "../assets/img/icons/user.svg"

export function StayReviews({ stay }) {
    const [curReview, setCurReview] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [visibleReviews, setVisibleReviews] = useState(6);

    const imgUrls = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStvtniRWswauECJGmrYfc4xt4Ifer55q_J6w&s",
        "https://upload.wikimedia.org/wikipedia/en/e/ea/Mike_Ehrmantraut_BCS_S3.png",
        "https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png",
        "https://www.indiewire.com/wp-content/uploads/2019/07/BreakingBad_Hank.png",
        "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
        "https://static.boredpanda.com/blog/wp-content/uploads/2017/04/JAY_0572-2-2-58f798a00c4da__880.jpg",
        "https://pbs.twimg.com/media/D8dDZukXUAAXLdY.jpg",
        "https://www.ellwoodcityledger.com/gcdn/presto/2022/05/04/NECL/31766c5e-852f-49d9-aab0-38f7a7d18b39-ezgif-4-7526b52a77.jpg?width=1200&disable=upscale&format=pjpg&auto=webp",
        "https://i.dailymail.co.uk/i/pix/2013/08/29/article-2405475-1B8389EE000005DC-718_634x550.jpg",
        "https://xsgames.co/randomusers/assets/avatars/male/74.jpg",
        "https://img.freepik.com/free-photo/front-view-smiley-woman-with-earbuds_23-2148613052.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGa8nbA4_Y8eEKDf7xiwty91QSKdjt77_UwQ&s"
    ]

    let reviews = stay.reviews ? stay.reviews :
        [
            {
                "at": "2018-02-24T05:00:00.000Z",
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
                "at": "2017-01-07T05:00:00.000Z",
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
                "at": "2016-09-11T04:00:00.000Z",
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
                "at": "2016-07-28T04:00:00.000Z",
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

    function formatDate(dateStr) {
        const date = new Date(dateStr)
        const options = { month: 'long', day: 'numeric' }
        const formattedDate = date.toLocaleDateString('en-US', options)

        return formattedDate
    }

    const onShowReview = (review) => {
        setCurReview(review)
        setShowModal(true)
    }

    const onCloseModal = () => {
        setShowModal(false)
    }


    const handleShowMore = () => {
        visibleReviews === reviews.length ? setVisibleReviews(6) : setVisibleReviews(reviews.length)
    }

    return (
        <section className="stay-reviews">
            <h2 className="stay-reviews-title">&#9733; {stay.rating} · {reviews.length} reviews</h2>
            <section className="stay-reviews-list">
                {reviews.slice(0, visibleReviews).map((review, index) => (
                    <div key={index} className="review">
                        <section className="review-user-info">
                            <img
                                src={review.by.imgUrl}
                                alt={review.by.fullname}
                                onError={(e) => e.target.src = imgUrls[getRandomIntInclusive(0, imgUrls.length)]}
                            />
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
            {/* {visibleReviews < reviews.length && ( */}
            <button className="show-all-reviews-btn" onClick={handleShowMore}>
                {visibleReviews === reviews.length ? `Show less` : `Show all ${reviews.length} reviews`}
            </button>
            {/* )} */}
            {showModal && (
                <div className="stay-reviews-modal">
                    <span className="stay-reviews-modal-close" onClick={onCloseModal}>&times;</span>
                    <section className="review-user-info">
                        <img
                            src={curReview.by.imgUrl}
                            alt={curReview.by.fullname}
                            onError={(e) => e.target.src = imgUrls[getRandomIntInclusive(0, imgUrls.length)]}
                        />
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
    );
}