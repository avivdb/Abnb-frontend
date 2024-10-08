import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'

import { orderService } from '../services/order/'
import { calculateNights, formatDateToHyphen, removeSpaces } from '../services/util.service.js'
import { loadStay, addStayMsg } from '../store/actions/stay.actions'
import { StayRating } from '../cmps/StayRating'
import { BedroomsCarousel } from '../cmps/BedroomsCarousel'
import { AmenitiesModal } from '../cmps/AmenitiesModal'

import { OrderDetails } from '../cmps/OrderDetails'
import { StayReviews } from '../cmps/StayReviews.jsx'
import { GoogleMap } from '../cmps/GoogleMap.jsx'
import { StayDetailsHeader } from '../cmps/StayDetailsHeader.jsx'
import { OrderDateModel } from '../cmps/OrderDateModel.jsx'


import Airconditioning from "../assets/img/icons/Airconditioning.svg"
import Balcony from "../assets/img/icons/Balcony.svg"
import Beachfront from "../assets/img/icons/Beachfront.svg"
import Bidet from "../assets/img/icons/Bidet.svg"
import Coffee from "../assets/img/icons/Coffee.svg"
import Crib from "../assets/img/icons/Crib.svg"
import EVcharger from "../assets/img/icons/EVcharger.svg"
import Firepit from "../assets/img/icons/Firepit.svg"
import Freeparking from "../assets/img/icons/Freeparking.svg"
import Garden from "../assets/img/icons/Garden.svg"
import Hairdryer from "../assets/img/icons/Hairdryer.svg"
import Hangers from "../assets/img/icons/Hangers.svg"
import Kitchen from "../assets/img/icons/Kitchen.svg"
import Mountainview from "../assets/img/icons/Mountainview.svg"
import Petsallowed from "../assets/img/icons/Petsallowed.svg"
import Pingpongtable from "../assets/img/icons/Pingpongtable.svg"
import Pooltable from "../assets/img/icons/Pooltable.svg"
import Privatepool from "../assets/img/icons/Privatepool.svg"
import Seaview from "../assets/img/icons/Seaview.svg"
import Smokingallowed from "../assets/img/icons/Smokingallowed.svg"
import TV from "../assets/img/icons/TV.svg"
import Washer from "../assets/img/icons/Washer.svg"
import Wifi from "../assets/img/icons/Wifi.svg"
import Wineglasses from "../assets/img/icons/Wineglasses.svg"

import gallerydots from "../assets/img/icons/gallerydots.svg"
import bed from "../assets/img/icons/bed.svg"
import { ImgCarousel } from '../cmps/ImgCarousel.jsx'
import { StayDetailsMobileFooter } from '../cmps/StayDetailsMobileFooter.jsx'



const amenitiesUrl = {
    "Airconditioning": Airconditioning,
    "Balcony": Balcony,
    "Beachfront": Beachfront,
    "Bidet": Bidet,
    "Coffee": Coffee,
    "Crib": Crib,
    "EVcharger": EVcharger,
    "Firepit": Firepit,
    "Freeparking": Freeparking,
    "Garden": Garden,
    "Hairdryer": Hairdryer,
    "Hangers": Hangers,
    "Kitchen": Kitchen,
    "Mountainview": Mountainview,
    "Petsallowed": Petsallowed,
    "Pingpongtable": Pingpongtable,
    "Pooltable": Pooltable,
    "Privatepool": Privatepool,
    "Seaview": Seaview,
    "Smokingallowed": Smokingallowed,
    "TV": TV,
    "Washer": Washer,
    "Wifi": Wifi,
    "Wineglasses": Wineglasses
}


export function StayDetails() {

    const { stayId } = useParams()
    const stay = useSelector(storeState => storeState.stayModule.stay)
    const user = useSelector(storeState => storeState.userModule.user)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    const navigate = useNavigate()
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const [orderToEdit, setOrderToEdit] = useState(orderService.getEmptyOrder())
    const [amenitiesModal, setAmenitiesModal] = useState(false)
    const [header, setHeader] = useState(false)
    const [imgError, setImgError] = useState(false)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
        loadStay(stayId)

    }, [stayId])

    useEffect(() => {
        if (stay) {
            setOrderToEdit(prevOrder => {
                const orderFromFilterBy = { ...prevOrder }
                orderFromFilterBy.guestCounts = {
                    adults: filterBy.guest.adult || 1,
                    children: filterBy.guest.children || 0,
                    infants: filterBy.guest.infant || 0,
                    pets: filterBy.guest.pet || 0,
                }
                orderFromFilterBy.capacity = filterBy.guest.capacity || 1,
                    orderFromFilterBy.startDate = formatDateToHyphen(filterBy.checkIn) || stay.defaultCheckin
                orderFromFilterBy.endDate = formatDateToHyphen(filterBy.checkOut) || stay.defaultCheckout

                return orderFromFilterBy
            })
        }
    }, [stay, filterBy])


    useEffect(() => {
        handleScroll()

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])


    function handleReserve() {
        if (user === null) navigate(`/login`)
        else {
            const params = new URLSearchParams({
                startDate: orderToEdit.startDate,
                endDate: orderToEdit.endDate,
                totalPrice: orderToEdit.totalPrice,
                adults: orderToEdit.guestCounts.adults,
                children: orderToEdit.guestCounts.children,
                infants: orderToEdit.guestCounts.infants,
                pets: orderToEdit.guestCounts.pets,
                capacity: orderToEdit.capacity,
            }).toString()

            window.scrollTo({
                top: 0,
                behavior: 'instant'
            })

            navigate(`/stay/${stay._id}/checkout?${params}`)
        }
    }


    function handleScroll() {
        if (window.scrollY > 545) {
            // console.log('Setting header to true')
            setHeader(true)
        } else {
            // console.log('Setting header to false')
            setHeader(false)
        }
    }

    function onShowAmenities() {
        setAmenitiesModal(true)
    }

    function handleImageError() {
        setImgError(true)
    }


    if (!stay) {
        return (
            <div className='loader-wrapper'>
                <div className="loader"></div>
            </div>
        )
    }

    return (
        <section className="stay-details">

            {header && !isSmallScreen && <StayDetailsHeader stay={stay} handleReserve={handleReserve} />}
            {isSmallScreen && <StayDetailsMobileFooter stay={stay} handleReserve={handleReserve} />}


            {stay && <div className='stay-details-content'>
                <h1 className='stay-details-name'>{stay.name}</h1>

                {isSmallScreen ?
                    <ImgCarousel stay={stay} /> :
                    <section id="photos" className='gallery'>
                        {stay.imgUrls.slice(0, 5).map((imgUrl, idx) => (
                            <img key={idx} src={imgUrl} className={idx === 0 ? 'main-img' : ''} />))}
                        {stay.imgUrls.length > 5 && <button onClick={() => navigate(`/stay/gallery/${stay._id}/`)}><img src={gallerydots} />Show all photos</button>}
                    </section>
                }

                <section className='details-content'>
                    <div className='detail-content-top'>
                        <h3 className='stay-location-des'>{stay.type} in {stay.loc.city}, {stay.loc.country}</h3>
                        <h3 className="stay-dry-details">
                            {
                                `${stay.capacity} ${stay.capacity === 1 ? "guest" : "guests"} • 
              ${stay.bedrooms.length} ${stay.bedrooms.length === 1 ? "bedroom" : "bedrooms"} • 
              ${stay.beds} ${(stay.beds) === 1 ? "bed" : "beds"} •
              ${stay.bathrooms} ${stay.bathrooms === 1 ? "bath" : "baths"}`
                            }
                        </h3>

                        <StayRating stay={stay} />
                        <hr />

                        <div className='stay-details-host'>
                            {imgError ? (
                                <div className="div-user-img">{stay.host.fullname.charAt(0)}</div>
                            ) : (
                                <img
                                    src={stay.host.pictureUrl}
                                    alt={stay.host.fullname}
                                    onError={handleImageError}
                                />
                            )}
                            <section>
                                <h3>Hosted by {stay.host.fullname}</h3>
                                <p>{stay.host.years} years hosting</p>
                            </section>
                        </div>
                        <hr />

                        <h2 className='stay-summary'>{stay.summary}</h2>
                        <hr />

                        <div className='stay-bedroom-display'>
                            <h4>Where you'll sleep</h4>
                            <section className='stay-bedroom-list'>
                                {!isSmallScreen ?
                                    <BedroomsCarousel stay={stay} /> :
                                    <>
                                        {stay.bedrooms.map((bedroom, index) => (
                                            <div key={index} className='stay-bedroom-display-card'>
                                                <section className='bed-imgs'>
                                                    {Array.from({ length: bedroom.beds }).map((_, index) => (
                                                        <img key={index} src={bed} alt={`Bed ${index + 1}`} />
                                                    ))}
                                                </section>
                                                <h1>Bedroom {index + 1}</h1>
                                                <p>{bedroom.beds} Bed{bedroom.beds > 1 ? 's' : ''}</p>
                                            </div>
                                        ))}
                                    </>
                                }
                            </section>
                        </div>
                        <hr />

                        <h2 id="amenities" className="amenities-title">What this place offers</h2>
                        <section className="amenities">
                            {stay.amenities.slice(0, 10).map((amenity, index) => (
                                <div className="amenity" key={index}>
                                    <img
                                        src={amenitiesUrl[removeSpaces(amenity)]}
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

                        {!isSmallScreen &&
                            <>
                                <h2 className="details-dates-picker-title">{calculateNights(orderToEdit.startDate, orderToEdit.endDate)} nights in {stay.loc.city}</h2>
                                <section className="details-dates-picker">
                                    <OrderDateModel
                                        orderToEdit={orderToEdit}
                                        setOrderToEdit={setOrderToEdit}
                                        setIsDateModalOpen={null}
                                    />
                                </section>
                            </>
                        }


                    </div>

                    {!isSmallScreen &&
                        <div className="order-details-container">
                            <OrderDetails
                                stay={stay}
                                orderToEdit={orderToEdit}
                                setOrderToEdit={setOrderToEdit}
                                handleReserve={handleReserve} />
                        </div>
                    }

                </section>

                {!isSmallScreen && <hr />}
                <section id="reviews">
                    <StayReviews stay={stay} />
                </section>

                <hr />
                <h2 id="location" className="google-map-title">Where you'll be</h2>
                <section className='google-map'>
                    <GoogleMap stays={[stay]} mapHeight={"400px"} mapBorderRadius={"10px"} />
                    <p>{stay.loc.city}, {stay.loc.country}</p>
                </section>

            </div>
            }


        </section >
    )
}