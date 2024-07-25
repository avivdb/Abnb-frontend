import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getRandomIntInclusive } from '../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay, addStayMsg } from '../store/actions/stay.actions'
import { StayRating } from '../cmps/StayRating'
import { BedroomsCarousel } from '../cmps/BedroomsCarousel'
import { AmenitiesModal } from '../cmps/AmenitiesModal'

import { OrderDetails } from '../cmps/OrderDetails'
import { Google } from '@mui/icons-material'
import { GoogleMap } from '../cmps/GoogleMap.jsx'

export function StayDetails() {

  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)
  const [amenitiesModal, setAmenitiesModal] = useState(false)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  function onShowAmenities() {
    setAmenitiesModal(true)
  }

  return (
    <section className="stay-details ">

      {stay && <div className='stay-details-content stay-details-layout'>
        <h1 className='stay-details-name'>{stay.name}</h1>

        <section className='gallery'>
          {stay.imgUrls.map((imgUrl, idx) => (
            <img key={idx} src={imgUrl} className={idx === 0 ? 'main-img' : ''} />))}
        </section>

        <section className='details-content'>
          <div className='detail-content-top'>
            <h3 className='stay-location-des'>{stay.type} in {stay.loc.city}, {stay.loc.country}</h3>
            <h3 className="stay-dry-details">
              {
                `${stay.guests} ${stay.guests === 1 ? "guest" : "guests"} • 
              ${stay.bedrooms.length} ${stay.bedrooms.length === 1 ? "bedroom" : "bedrooms"} • 
              ${stay.beds} ${(stay.beds) === 1 ? "bed" : "beds"} •
              ${stay.baths} ${stay.baths === 1 ? "bath" : "baths"}`
              }
            </h3>

            <StayRating stay={stay} />
            <hr />

            <div className='stay-details-host'>
              <img src="https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png" />
              <section>
                <h3>Hosted by {stay.host.fullname}</h3>
                <p>{getRandomIntInclusive(2, 12)} years hosting</p>
              </section>
            </div>
            <hr />

            <h2 className='stay-summary'>{stay.summary}</h2>
            <hr />

            <div className='stay-bedroom-display'>
              <h4 style={{ marginInlineStart: "1.5rem" }}>Where you'll sleep</h4>
              <section className='stay-bedroom-list'>
                <BedroomsCarousel stay={stay} />
              </section>
            </div>
            <hr />

            <h2 className="amenities-title">What this place offers</h2>
            <section className="amenities">
              {stay.amenities.slice(0, 10).map((amenity, index) => (
                <div className="amenity" key={index}>
                  <img
                    src={`../src/assets/img/icons/${amenity}.svg`}
                    alt={`${amenity} icon`}
                    className="icon"
                  />
                  <h3>{amenity}</h3>
                </div>
              ))}
              {(stay.amenities.length >= 10) &&
                <button className='show-amenities-modal' onClick={onShowAmenities}>
                  {`Show all ${stay.amenities.length} amenities`}
                </button>}
              {amenitiesModal && <AmenitiesModal setAmenitiesModal={setAmenitiesModal} amenities={stay.amenities} />}
            </section>

          </div>

          <div className="order-details-container"><OrderDetails stay={stay} /></div>

        </section>

        <h2 className="google-map-title">Where you'll be</h2>
        <section>
          <GoogleMap stay={stay} />
        </section>

      </div>
      }


    </section >
  )
}