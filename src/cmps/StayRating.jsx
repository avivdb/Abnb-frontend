import { useMediaQuery } from "@mui/material";

import goldLeft from "../assets/img/icons/gf-gold-left.png"
import left from "../assets/img/icons/gf-left.svg"
import goldRight from "../assets/img/icons/gf-gold-right.png"
import right from "../assets/img/icons/gf-right.svg"


export function StayRating({ stay }) {

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const gfLeft = stay.rating === 5 ? goldLeft : left
  const gfRight = stay.rating === 5 ? goldRight : right

  return (
    <>
      {stay.rating < 4.5 && (
        <h3>&#9733; {stay.rating.toFixed(1)}</h3>
      )}
      {stay.rating >= 4.5 && (
        <section className='stay-rating'>
          <div className='stay-rating-icon'>
            <img src={gfLeft} />
            <h3>Guest favorite</h3>
            <img src={gfRight} />
          </div>
          {!isSmallScreen && <p>One of the most loved homes on Abnb, according to guests</p>}
          <div className="stay-rating-rating">
            <h5>{stay.rating.toFixed(1)}</h5>
            <h5>&#9733; &#9733; &#9733; &#9733; &#9733;</h5>
            {/* <div className='stars'>
              {[...Array(5)].map((_, idx) => (
                <img key={idx} src="../src/assets/img/icons/star.svg" className="star" />
              ))}
            </div> */}
          </div>
          <div className='stay-rating-reviews'>
            <h2>{stay.reviews ? stay.reviews.length : ''}</h2>
            <h4>Reviews</h4>
          </div>

        </section>
      )}
    </>
  )
}
