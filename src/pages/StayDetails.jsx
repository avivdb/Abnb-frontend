import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay, addStayMsg } from '../store/actions/stay.actions'
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
            <hr />
            <h2>What this place offers</h2>
            <section className="amenities">
              {stay.amenities.map((amenity, index) => (
                <div key={index}>
                  <img
                    src={`../src/assets/img/icons/${amenity}.svg`}
                    alt={`${amenity} icon`}
                    className="icon"
                  />
                  <h3>{amenity}</h3>
                </div>
              ))}
            </section>
            {/* <Amenities stay={stay} /> */}
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