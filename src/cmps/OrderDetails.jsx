import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { addOrder } from "../store/actions/order.action"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { orderService } from "../services/order"
import { OrderDateModel } from "./OrderDateModel"
import { OrderGuestsModal } from "./OrderGuestsModal"
import dayjs from 'dayjs'

// check if necessary totalPrice

export function OrderDetails({ stay }) {
    const initialCheckinDate = stay.defaultCheckin.slice(0, 10)
    const initialCheckoutDate = stay.defaultCheckout.slice(0, 10)

    const [checkinDate, setCheckinDate] = useState(initialCheckinDate)
    const [checkoutDate, setCheckoutDate] = useState(initialCheckoutDate)
    const [numberOfNights, setNumberOfNights] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const [orderToEdit, setOrderToEdit] = useState(orderService.getOrderToEditFromSearchParams(searchParams))
    const navigate = useNavigate()

    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)

     // State for guests
     const [adultCounter, setAdultCounter] = useState(orderToEdit.guestCounts.adults || 1)
     const [childrenCounter, setChildrenCounter] = useState(orderToEdit.guestCounts.children || 0)
     const [infantCounter, setInfantCounter] = useState(orderToEdit.guestCounts.infants || 0)
     const [petCounter, setPetCounter] = useState(orderToEdit.guestCounts.pets || 0)

    useEffect(() => {
        updateBookingDetails()
    }, [checkinDate, checkoutDate])

    useEffect(() => {
        setSearchParams({
            startDate: checkinDate,
            endDate: checkoutDate,
            totalPrice: orderToEdit.totalPrice,
            adults: orderToEdit.guestCounts.adults,
            children: orderToEdit.guestCounts.children,
            infants: orderToEdit.guestCounts.infants,
            pets: orderToEdit.guestCounts.pets,
            guests: orderToEdit.guests,
        
        })
    }, [checkinDate, checkoutDate, orderToEdit])
    // }, [checkinDate, checkoutDate])

    useEffect(() => {
        setOrderToEdit(prev => ({
            ...prev,
            guestCounts: {
                adults: adultCounter,
                children: childrenCounter,
                infants: infantCounter,
                pets: petCounter
            }
        }))
    }, [adultCounter, childrenCounter, infantCounter, petCounter])

    function handleCheckinChange(event) {
        setCheckinDate(event.target.value)
    }

    function handleCheckoutChange(event) {
        setCheckoutDate(event.target.value)
    }


    function calculateNights(checkin, checkout) {
        const checkinDate = new Date(checkin)
        const checkoutDate = new Date(checkout)
        const differenceInTime = checkoutDate - checkinDate
        const differenceInDays = differenceInTime / (1000 * 3600 * 24)
        return differenceInDays
    }

    function updateBookingDetails() {
        if (checkinDate && checkoutDate) {
            const nights = calculateNights(checkinDate, checkoutDate)
            setNumberOfNights(nights)
            setOrderToEdit({
                ...orderToEdit,
                startDate: checkinDate,
                endDate: checkoutDate,
                totalPrice: stay.price * nights + 500 //stay.price * nights + Airbnb service fee
            })
        } else {
            setNumberOfNights(0)
            setOrderToEdit({
                ...orderToEdit,
                startDate: '',
                endDate: '',
                totalPrice: 0
            })
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

            <button className="od-btn-booking-dates" onClick={() => setIsDateModalOpen(true)}>
                <div className="od-booking-dates">
                    <div className="od-booking-date">
                        <span className="od-text">CHECK-IN</span>
                        <span className="od-value">{dayjs(checkinDate).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className="od-booking-date">
                        <span className="od-text">CHECK-OUT</span>
                        <span className="od-value">{dayjs(checkoutDate).format('DD/MM/YYYY')}</span>
                    </div>
                </div>
            </button>

            {isDateModalOpen && (<section className="od-date-modal">
                <div className="date-picker-container">
                    <OrderDateModel
                        checkin={checkinDate}
                        checkout={checkoutDate}
                        setCheckinDate={setCheckinDate}
                        setCheckoutDate={setCheckoutDate}
                        setIsDateModalOpen={setIsDateModalOpen} 
                    />
                </div>
            </section>)}

            
            
            <button onClick={() => setIsGuestsModalOpen(true)}>Guests</button>
            <h5>{getGuestSummary()}</h5>
            {isGuestsModalOpen && (<section className="od-guests-modal">
                <OrderGuestsModal orderToEdit={orderToEdit} setOrderToEdit={setOrderToEdit} stay={stay}/>
            </section>)}


            <button className="od-btn-order" onClick={handleReserve}>Reserve</button>
            <h4>You won't be charged yet</h4>
            <div className="payment">
                <h3 className="payment-details">₪{stay.price} x {numberOfNights} nights</h3>
                <h3>₪{stay.price * numberOfNights}</h3>
            </div>
            <div className="payment">
                <h3 className="payment-details">Airbnb service fee</h3>
                <h3>₪500</h3>
            </div>
            <hr />
            <div className="payment total">
                <h3>Total</h3>
                <h3>₪{stay.price * numberOfNights + 500}</h3>
            </div>

        </article>
    )
}

