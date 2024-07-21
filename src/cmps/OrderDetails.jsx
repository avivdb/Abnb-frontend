import { useEffect, useState } from "react";
import { addOrder } from "../store/actions/order.action";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { Link } from 'react-router-dom'


export function OrderDetails({ stay }) {
    const [checkinDate, setCheckinDate] = useState('')
    const [checkoutDate, setCheckoutDate] = useState('')
    const [numberOfNights, setNumberOfNights] = useState(0)
    const [orderToEdit, setOrderToEdit] = useState({ startDate: '', endDate: '', totalPrice: 0 })

    useEffect(() => {
        updateBookingDetails()

    }, [checkinDate, checkoutDate])

    function handleCheckinChange(event) {
        setCheckinDate(event.target.value)
    }

    function handleCheckoutChange(event) {
        setCheckoutDate(event.target.value)
    }

    // function getEnteredDates() {
    //     return {
    //         checkin: checkinDate,
    //         checkout: checkoutDate
    //     }
    // }

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
                startDate: checkinDate,
                endDate: checkoutDate,
                totalPrice: stay.price * nights
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


    async function onAddOrder() {
		if (!orderToEdit.startDate || !orderToEdit.endDate) return alert('All fields are required')
            
		try {
			await addOrder({ order: orderToEdit, stay: stay })
			showSuccessMsg('Review added')
			setOrderToEdit({ startDate: '', endDate: '', totalPrice: 0 })
            setCheckinDate('')
            setCheckoutDate('')
            setNumberOfNights(0)
		} catch (err) {
			showErrorMsg('Cannot add order')
		}
	}

    return (
        <article className='order-details'>
            <label>
                CHECK-IN
                <input type="date" value={checkinDate} onChange={handleCheckinChange} />
            </label>
            <label>
                CHECKOUT
                <input type="date" value={checkoutDate} onChange={handleCheckoutChange} />
            </label>

            <h2>₪{stay.price} <span>night</span></h2>
            <Link to={`/stay/checkout/${order._id}`} target='_blank'><button onClick={onAddOrder}>Reserve</button></Link>
            <h4>You won't be charged yet</h4>
            <h3>₪{stay.price} x {numberOfNights} nights</h3>
            <h3>₪{stay.price * numberOfNights}</h3>




        </article>
    )
}

