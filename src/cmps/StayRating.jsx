import { getRandomIntInclusive } from '../services/util.service.js'


// function calculateReviewAverage() {
// // function calculateReviewAverage(reviews) {

//     const reviewsLength = getRandomIntInclusive(1, 200) //
//     const totalRating = getRandomIntInclusive(1, 1000) //
//     const averageRating = +(totalRating / reviewsLength).toFixed(2) //
//     console.log('averageRating:', averageRating) //
//     // if (reviews.length === 0) return 0

//     // const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
//     // const averageRating = totalRating / reviews.length
//     return averageRating
//   }

// const average = calculateReviewAverage();
export function StayRating(stay) {
  console.log('stay:', stay)
  console.log('stay.rating:', stay.rating)
  const gfLeft = stay.rating === 5.0 ? 'gold-left.png' : 'left.svg'
  const gfRight = stay.rating === 5.0 ? 'gold-right.png' : 'right.svg'

  return (
    <>
      {stay.rating < 4.5 && (
        <div>
          <img key={idx} src="../src/assets/img/icons/star.svg" className="star" />
          <h3>{stay.rating}</h3>
        </div>
      )}
      {stay.rating >= 4.5 && (
        <section className='stay-rating'>
          <div className='logo'>
            <img src={`../src/assets/img/icons/gf-${gfLeft}`} />
            <h3>Guest favorite</h3>
            <img src={`../src/assets/img/icons/gf-${gfRight}`} />
          </div>
          <p>One of the most loved homes on Airbnb, according to guses</p>
          <div className="rating">
            <h2>5.0</h2>
            <div className='stars'>
              {[...Array(5)].map((_, idx) => (
                <img key={idx} src="../src/assets/img/icons/star.svg" className="star" />
              ))}
            </div>
          </div>
          <span>|</span>
          <div className='reviews'>
            <h2>23</h2>
            <h4>Reviews</h4>
          </div>

        </section>
      )}
    </>
  )
}
