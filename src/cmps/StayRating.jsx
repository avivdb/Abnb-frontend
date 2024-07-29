
export function StayRating({stay}) {
 
  const gfLeft = stay.rating === 5.0 ? 'gold-left.png' : 'left.svg'
  const gfRight = stay.rating === 5.0 ? 'gold-right.png' : 'right.svg'

  return (
    <>
      {stay.rating < 4.5 && (
          <h3>&#9733; {stay.rating}</h3>
      )}
      {stay.rating >= 4.5 && (
        <section className='stay-rating'>
          <div className='stay-rating-icon'>
            <img src={`../src/assets/img/icons/gf-${gfLeft}`} />
            <h3>Guest favorite</h3>
            <img src={`../src/assets/img/icons/gf-${gfRight}`} />
          </div>
          <p>One of the most loved homes on Abnb, according to guests</p>
          <div className="stay-rating-rating">
            <h5>{stay.rating}</h5>
            <h5>&#9733; &#9733; &#9733; &#9733; &#9733;</h5>
            {/* <div className='stars'>
              {[...Array(5)].map((_, idx) => (
                <img key={idx} src="../src/assets/img/icons/star.svg" className="star" />
              ))}
            </div> */}
          </div>
          <div className='stay-rating-reviews'>
            <h2>{stay.reviews.length}</h2>
            <h4>Reviews</h4>
          </div>

        </section>
      )}
    </>
  )
}
