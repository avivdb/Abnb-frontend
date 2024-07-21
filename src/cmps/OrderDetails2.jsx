import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { addOrder } from "../store/actions/order.action"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { DateRangePickerInOrder } from "./DateRangePickerInOrder"
import { orderService } from "../services/order"


export function OrderDetails2({ stay }) {
    const [checkinDate, setCheckinDate] = useState(stay.defaultCheckin)
    const [checkoutDate, setCheckoutDate] = useState(stay.defaultCheckout)
    const [numberOfNights, setNumberOfNights] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const [orderToEdit, setOrderToEdit] = useState(orderService.getOrderToEditFromSearchParams(searchParams))
    const navigate = useNavigate()

    useEffect(() => {
        updateBookingDetails()
        console.log('orderToEdit:', orderToEdit)
    }, [checkinDate, checkoutDate])

    useEffect(() => {
        setSearchParams({
            startDate: checkinDate,
            endDate: checkoutDate,
            totalPrice: orderToEdit.totalPrice
        });
    }, [orderToEdit]);

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
        if (checkinDate !== '' && checkoutDate !== '') {
            const nights = calculateNights(checkinDate, checkoutDate)
            setNumberOfNights(nights)
            setOrderToEdit({
                ...orderToEdit,
                startDate: new Date(checkinDate).getTime(),
                endDate: new Date(checkoutDate).getTime(),
                // startDate: checkinDate,
                // endDate: checkoutDate,
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
        navigate(`/stay/checkout?startDate=${orderToEdit.startDate}&endDate=${orderToEdit.endDate}&totalPrice=${orderToEdit.totalPrice}`)
    }


    // async function onAddOrder() {
    //     if (!orderToEdit.startDate || !orderToEdit.endDate) return alert('All fields are required')

    //     try {
    //         await addOrder({ order: orderToEdit, stay: stay })
    //         showSuccessMsg('Order added')
    //         setOrderToEdit({ startDate: '', endDate: '', totalPrice: 0 })
    //         setCheckinDate('')
    //         setCheckoutDate('')
    //         setNumberOfNights(0)
    //     } catch (err) {
    //         showErrorMsg('Cannot add order')
    //     }
    // }

    return (
        <article className='order-details'>
            <div className="price-per-night">
                <h2>₪{stay.price}</h2>
                <span>night</span>
            </div>

            <div className="suggest-me-a-name">
                
                <label>
                    CHECK-IN
                    {/* <input type="date" value={formatDate(checkinDate)} onChange={handleCheckinChange} /> */}
                    <input type="date" value={checkinDate} onChange={handleCheckinChange} />
                </label>
                <label>
                    CHECKOUT
                    {/* <input type="date" value={formatDate(checkoutDate)} onChange={handleCheckoutChange} /> */}
                    <input type="date" value={checkoutDate} onChange={handleCheckoutChange} />
                </label>
                {/* <DateRangePickerInOrder 
                // stay={stay} 
                checkin={stay.defaultCheckin} 
                checkout={stay.defaultCheckout}
                setCheckinDate={setCheckinDate}
                setCheckoutDate={setCheckoutDate}
                /> */}
            </div>

            {/* <Link to={`/stay/checkout`} className="btn-order">Reserve</Link> */}
            {/* <Link to={`/stay/checkout`} target='_blank'><button onClick={onAddOrder}>Reserve</button></Link> */}
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

