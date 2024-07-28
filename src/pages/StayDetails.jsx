import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { orderService } from "../services/order"


import { getRandomIntInclusive, calculateNights } from '../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay, addStayMsg } from '../store/actions/stay.actions'
import { StayRating } from '../cmps/StayRating'
import { BedroomsCarousel } from '../cmps/BedroomsCarousel'
import { AmenitiesModal } from '../cmps/AmenitiesModal'

import { OrderDetails } from '../cmps/OrderDetails'
import { StayReviews } from '../cmps/StayReviews.jsx'
import { Google } from '@mui/icons-material'
import { GoogleMap } from '../cmps/GoogleMap.jsx'
import { StayDetailsHeader } from '../cmps/StayDetailsHeader.jsx'
import { OrderDateModel } from '../cmps/OrderDateModel.jsx'

export function StayDetails() {

  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const [orderToEdit, setOrderToEdit] = useState(orderService.getOrderToEditFromSearchParams(searchParams))

  const [amenitiesModal, setAmenitiesModal] = useState(false)
  const [header, setHeader] = useState(false)



  useEffect(() => {
    loadStay(stayId)
    console.log('searchparams', searchParams)
  }, [stayId, searchParams])

  useEffect(() => {
    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

  }, [])

  function handleReserve() {
    console.log('handleReserve called');
    const params = new URLSearchParams({
      startDate: orderToEdit.startDate,
      endDate: orderToEdit.endDate,
      totalPrice: orderToEdit.totalPrice,
      adults: orderToEdit.guestCounts.adults,
      children: orderToEdit.guestCounts.children,
      infants: orderToEdit.guestCounts.infants,
      pets: orderToEdit.guestCounts.pets,
      guests: orderToEdit.guests,
    }).toString()

    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
    console.log('Navigating with params:', params);
    navigate(`/stay/${stay._id}/checkout?${params}`)
  }


  function handleScroll() {
    if (window.scrollY > 545) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }

  function onShowAmenities() {
    setAmenitiesModal(true)
  }

  return (
    <section className="stay-details ">

      {header && <StayDetailsHeader stay={stay} handleReserve={handleReserve} />}
      {header && <StayDetailsHeader stay={stay} handleReserve={handleReserve} />}

      {stay && <div className='stay-details-content stay-details-layout'>
        <h1 className='stay-details-name'>{stay.name}</h1>

        <section id="photos" className='gallery'>
          {stay.imgUrls.map((imgUrl, idx) => (
            <img key={idx} src={imgUrl} className={idx === 0 ? 'main-img' : ''} />))}
        </section>

        <section className='details-content'>
          <div className='detail-content-top'>
            <h3 className='stay-location-des'>{stay.type} in {stay.loc.city}, {stay.loc.country}</h3>
            <h3 className="stay-dry-details">
              {
                `${stay.capacity} ${stay.capacity === 1 ? "guest" : "guests"} • 
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
              <h4>Where you'll sleep</h4>
              <section className='stay-bedroom-list'>
                <BedroomsCarousel stay={stay} />
              </section>
            </div>
            <hr />

            <h2 id="amenities" className="amenities-title">What this place offers</h2>
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
            <hr />

            <h2 className="details-dates-picker-title">{calculateNights(orderToEdit.startDate, orderToEdit.endDate)} nights in {stay.loc.city}</h2>
            <section className="details-dates-picker">
              <OrderDateModel
                orderToEdit={orderToEdit}
                setOrderToEdit={setOrderToEdit}
                setIsDateModalOpen={null}
              />
            </section>


          </div>

          <div className="order-details-container">
            <OrderDetails
              stay={stay}
              orderToEdit={orderToEdit}
              setOrderToEdit={setOrderToEdit}
              setSearchParams={setSearchParams}
              handleReserve={handleReserve} />
          </div>

        </section>

        <hr />
        <section id="reviews">
          <StayReviews stay={stay} />
        </section>

        <hr />
        <h2 id="location" className="google-map-title">Where you'll be</h2>
        <section className='google-map'>
          {console.log('stay', stay)}
          <GoogleMap stays={[stay]} mapHeight={"400px"} mapBorderRadius={"10px"} />
          <p>{stay.loc.city}, {stay.loc.country}</p>
        </section>

      </div>
      }


    </section >
  )
}