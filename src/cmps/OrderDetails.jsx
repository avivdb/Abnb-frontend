import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { orderService } from "../services/order"
import { OrderDateModel } from "./OrderDateModel"
import { OrderGuestsModal } from "./OrderGuestsModal"
import dayjs from 'dayjs'
import { AbnbGradientBtn } from "./AbnbGradientBtn"

import arrowdown from "../assets/img/icons/arrowdown.svg"

// check if necessary totalPrice

export function OrderDetails({ stay }) {
    const [numberOfNights, setNumberOfNights] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const [orderToEdit, setOrderToEdit] = useState(orderService.getOrderToEditFromSearchParams(searchParams))
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setOrderToEdit(prevOrder => {
            const newOrder = { ...prevOrder }
            if (!newOrder.startDate) newOrder.startDate = stay.defaultCheckin.slice(0, 10)
                if (!newOrder.endDate) newOrder.endDate = stay.defaultCheckout.slice(0, 10)
                    return newOrder
            })
    }, [])

    // useEffect(() => {
    //     setSearchParams({...orderToEdit, ...guestCounts})
    // },[orderToEdit])

    useEffect(() => {
        setSearchParams({
            startDate: orderToEdit.startDate,
            endDate: orderToEdit.endDate,
            totalPrice: orderToEdit.totalPrice,
            adults: orderToEdit.guestCounts.adults,
            children: orderToEdit.guestCounts.children,
            infants: orderToEdit.guestCounts.infants,
            pets: orderToEdit.guestCounts.pets,
            guests: orderToEdit.guests,

        })
    }, [orderToEdit])

    useEffect(() => {
        updateBookingDetails()
    }, [orderToEdit.startDate, orderToEdit.endDate])

    function calculateNights(checkin, checkout) {
        const checkinDate = new Date(checkin)
        const checkoutDate = new Date(checkout)
        const differenceInTime = checkoutDate - checkinDate
        const differenceInDays = differenceInTime / (1000 * 3600 * 24)
        return differenceInDays
    }

    function updateBookingDetails() {
        if (orderToEdit.startDate && orderToEdit.startDate) {
            const nights = calculateNights(orderToEdit.startDate, orderToEdit.endDate)
            setNumberOfNights(nights)
            setOrderToEdit({
                ...orderToEdit,
                totalPrice: stay.price * nights + 500 //stay.price * nights + Airbnb service fee
            })
        } else {
            setNumberOfNights(1)
        }
    }


    function handleReserve() {
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

        navigate(`/stay/${stay._id}/checkout?${params}`)
    }

    function getGuestSummary() {
        const { guestCounts } = orderToEdit
        if (!guestCounts) {
            return '1 guest'
        }
        const totalGuests = guestCounts.adults + guestCounts.children
        const guestSummary = []

        guestSummary.push(`${totalGuests} ${totalGuests > 1 ? 'guest' : 'guest'}`)
        if (guestCounts.infants > 0) {
            guestSummary.push(`${guestCounts.infants} ${guestCounts.infants > 1 ? 'infants' : 'infant'}`)
        }
        if (guestCounts.pets > 0) {
            guestSummary.push(`${guestCounts.pets} ${guestCounts.pets > 1 ? 'pets' : 'pet'}`)
        }

        return guestSummary.join(', ')
    }


    return (
        <article className='order-details'>
            <div className="price-per-night">
                <h2>₪{stay.price}</h2>
                <span>night</span>
            </div>

            <section className="od-btns-booking-details">
                <div className="od-booking-date" onClick={() => setIsDateModalOpen(true)}>
                    <p className="od-text">CHECK-IN</p>
                    <p className="od-value">{dayjs(orderToEdit.startDate).format('DD/MM/YYYY')}</p>
                </div>
                <div className="od-booking-date" onClick={() => setIsDateModalOpen(true)}>
                    <p className="od-text">CHECK-OUT</p>
                    <p className="od-value">{dayjs(orderToEdit.endDate).format('DD/MM/YYYY')}</p>
                </div>
                <button className="od-booking-guests" onClick={() => setIsGuestsModalOpen(true)}>
                    <section>
                        <p>Guests</p>
                        <h5>{getGuestSummary()}</h5>
                    </section>
                    <img src={arrowdown} />
                </button>
            </section>


            {isDateModalOpen && (<section className="od-date-modal">
                <div className="date-picker-container">
                    <OrderDateModel
                        orderToEdit={orderToEdit}
                        setOrderToEdit={setOrderToEdit}
                        setIsDateModalOpen={setIsDateModalOpen}
                    />
                </div>
            </section>)}


            {isGuestsModalOpen && (<section className="od-guests-modal">
                <OrderGuestsModal
                    orderToEdit={orderToEdit}
                    setOrderToEdit={setOrderToEdit}
                    stay={stay}
                    setIsGuestsModalOpen={setIsGuestsModalOpen} />
            </section>)}

            <div className="btn-container"
                onClick={handleReserve}>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="content">
                    <div>
                        <span>Reserve</span>
                    </div>
                </div>
            </div>

            <section className="price-details-content">
                <h1>You won't be charged yet</h1>
                <div>
                    <h3>₪{stay.price} x {numberOfNights} nights</h3>
                    <h3>₪{stay.price * numberOfNights}</h3>
                </div>
                <div>
                    <h3>Cleaning fee</h3>
                    <h3>₪107</h3>
                </div>
                <div>
                    <h3>Airbnb service fee</h3>
                    <h3>₪500</h3>
                </div>
                <hr />
                <div className="payment-total">
                    <h3>Total</h3>
                    <h3>₪{stay.price * numberOfNights + 500 + 107}</h3>
                </div>
            </section>

            {/* <h4>You won't be charged yet</h4>
            <div className="payment">
                <p>₪{stay.price} x {numberOfNights} nights</p>
                <p>₪{stay.price * numberOfNights}</p>
            </div>
            <div className="payment">
                <p className="payment-details">Cleaning fee</p>
                <p>₪107</p>
            </div>
            <div className="payment">
                <p className="payment-details">Airbnb service fee</p>
                <p>₪500</p>
            </div> */}
            {/* <hr />
            <div className="payment total">
                <h3>Total</h3>
                <h3>₪{stay.price * numberOfNights + 500 + 107}</h3>
            </div> */}

        </article>
    )
}

