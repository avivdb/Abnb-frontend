import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay, addStayMsg } from '../store/actions/stay.actions'
import { Amenities } from '../cmps/Amenities'
import { StayRating } from '../cmps/StayRating'

// import gfGoldLeft from 'src/assets/img/icons/gf-gold-left.png'
// import gfGoldRight from 'src/assets/img/icons/gf-gold-right.png'
// import star from 'src/assets/img/icons/star.svg'

export function StayDetails() {

  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])


  return (
    <section className="stay-details">

      {stay && <div>
        <h1>{stay.name}</h1>
        <section className='gallery'>
          {stay.imgUrls.map((imgUrl, idx) => (
            <img key={idx} src={imgUrl} className={idx === 0 ? 'main-img' : ''} />))}
        </section>

        <section className='details-contect'>
          <div className='contect'>
            <h2>{stay.summary}</h2>
            
            <StayRating />
            
            <div className='host'>
              <h3>Hosted by {stay.host.fullname}</h3>
              <img src={stay.host.imgUrl} />
            </div>
            <hr/>
            <div  className="stay-highlights">
              <div>
                <img src="../src/assets/img/icons/trophy.avif" className="icon" />
                <h3>Top 5% of homes</h3>
                <h4>This home is highly ranked based on ratings, reviews, and reliability.</h4>
              </div>
              <div>
                <img src="../src/assets/img/icons/door.svg" className="icon" />
                <h3>Self check-in</h3>
                <h4>Check yourself in with the lockbox.</h4>
              </div>
              <div>
                <img src="../src/assets/img/icons/superhost.svg" className="icon" />
                <h3>{stay.host.fullname} is a Superhost</h3>
                <h4>Superhosts are experienced, highly rated Hosts.</h4>
              </div>
            </div>
            <hr/>
            <Amenities stay={stay} />
          </div>
          <article className='order-details'>
            <h2>${stay.price}</h2>

          </article>

        </section>
      </div>
      }


    </section >
  )
}