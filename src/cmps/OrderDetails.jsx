import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { orderService } from "../services/order"
import { OrderDateModel } from "./OrderDateModel"
import { OrderGuestsModal } from "./OrderGuestsModal"
import dayjs from 'dayjs'
import { AbnbGradientBtn } from "./AbnbGradientBtn"
import { calculateNights } from '../services/util.service.js'


import arrowdown from "../assets/img/icons/arrowdown.svg"

export function OrderDetails({ stay, orderToEdit, setOrderToEdit, setSearchParams, handleReserve }) {
    const [numberOfNights, setNumberOfNights] = useState(1)
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setOrderToEdit(prevOrder => {
            const newOrder = { ...prevOrder }
            if (!newOrder.startDate) newOrder.startDate = stay.defaultCheckin
            if (!newOrder.endDate) newOrder.endDate = stay.defaultCheckout
            return newOrder
        })
    }, [])


    useEffect(() => {
        setSearchParams({
            startDate: orderToEdit.startDate,
            endDate: orderToEdit.endDate,
            totalPrice: orderToEdit.totalPrice,
            adults: orderToEdit.guestCounts.adults,
            children: orderToEdit.guestCounts.children,
            infants: orderToEdit.guestCounts.infants,
            pets: orderToEdit.guestCounts.pets,
            capacity: orderToEdit.capacity,

        })
    }, [orderToEdit])

    useEffect(() => {
        updateBookingDetails()
    }, [orderToEdit.startDate, orderToEdit.endDate])

    function updateBookingDetails() {
        if (orderToEdit.startDate && orderToEdit.startDate) {
            const nights = calculateNights(orderToEdit.startDate, orderToEdit.endDate)
            setNumberOfNights(nights)
            setOrderToEdit({
                ...orderToEdit,
                totalPrice: stay.price * nights + 500 + 107 //stay.price * nights + Airbnb service fee + Cleaning fee
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
            capacity: orderToEdit.capacity,
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

    function transformDate(dateStr) {

        const [day, month, year] = dateStr.split('-');
        const newDateStr = `${day}/${month}/${year}`;
        
        return newDateStr;
    }

    return (
        <div className='order-details'>
            <div className="price-per-night">
                <h2>₪{stay.price}</h2>
                <span>night</span>
            </div>

            <section className="od-btns-booking-details">
                <div className="od-booking-date" onClick={() => setIsDateModalOpen(true)}>
                    <p className="od-text">CHECK-IN</p>
                    <p className="od-value">{transformDate(orderToEdit.startDate)}</p>
                </div>
                <div className="od-booking-date" onClick={() => setIsDateModalOpen(true)}>
                    <p className="od-text">CHECK-OUT</p>
                    <p className="od-value">{transformDate(orderToEdit.endDate)}</p>
                </div>
                <button className="od-booking-guests" onClick={() => setIsGuestsModalOpen(true)}>
                    <section>
                        <p>GUESTS</p>
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

            <AbnbGradientBtn handleClick={handleReserve} text="Reserve" />

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
        </div>
    )
}

