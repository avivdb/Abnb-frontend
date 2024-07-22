import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { addOrder } from "../store/actions/order.action"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { DateRangePickerInOrder } from "./DateRangePickerInOrder"
import { orderService } from "../services/order"

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

    // const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    useEffect(() => {
        updateBookingDetails()
    }, [checkinDate, checkoutDate])

    useEffect(() => {
        setSearchParams({
            startDate: checkinDate,
            endDate: checkoutDate,
            totalPrice: orderToEdit.totalPrice
        })
    }, [checkinDate, checkoutDate])

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
            totalPrice: orderToEdit.totalPrice
        }).toString()

        navigate(`/stay/${stay._id}/checkout?${params}`)
    }


    return (
        <article className='order-details'>
            <div className="price-per-night">
                <h2>₪{stay.price}</h2>
                <span>night</span>
            </div>

            {/* <div className="booking-dates">
                <button className="booking-date">
                    <span>CHECK-IN</span>
                    <span>{checkinDate}</span>
                </button>
                <button className="booking-date">
                    <span>CHECK-OUT</span>
                    <span>{checkoutDate}</span>
                </button>
            </div> */}

            <div className="booking-dates">
                <div className="booking-date">
                    <label>CHECK-IN</label>
                    <input type="text" value={checkinDate} onChange={handleCheckinChange} />
                </div>
                <div className="booking-date">
                    <label>CHECKOUT</label>
                    <input type="text" value={checkoutDate} onChange={handleCheckoutChange} />
                </div>
            </div>
            {/* {isDatePickerOpen && (
                <div className="date-picker-container">
                    <DateRangePickerInOrder
                        checkin={stay.defaultCheckin}
                        checkout={stay.defaultCheckout}
                        setCheckinDate={setCheckinDate}
                        setCheckoutDate={setCheckoutDate}
                    />
                    <button onClick={() => setIsDatePickerOpen(false)}>Close</button>
                </div>
            )} */}

            <button className="btn-order" onClick={handleReserve}>Reserve</button>
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

