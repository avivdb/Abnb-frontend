import { getRandomIntInclusive } from '../services/util.service.js'

export function StayRating() {
   
    function calculateReviewAverage() {
    // function calculateReviewAverage(reviews) {
        
        const reviewsLength = getRandomIntInclusive(1, 200) //
        const totalRating = getRandomIntInclusive(1, 1000) //
        const averageRating = +(totalRating / reviewsLength).toFixed(2) //
        console.log('averageRating:', averageRating) //
        // if (reviews.length === 0) return 0
      
        // const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
        // const averageRating = totalRating / reviews.length
        return averageRating
      }
    
    const average = calculateReviewAverage();
    const gfLeft = average >= 4.5 ? 'gold-left.png' : 'left.svg'
    const gfRight = average >= 4.5 ? 'gold-right.png' : 'right.svg'
    
    return (
        <section className='stay-rating'>
              <div className='logo'>
                {/* <img src="../src/assets/img/icons/gf-gold-left.png" />
                <img src="../src/assets/img/icons/gf-left.svg" /> */}
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
    )
}
