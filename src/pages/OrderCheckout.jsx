import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { stayService } from "../services/stay/stay.service.local"
import { CountrySelectModal } from "../cmps/CountrySelectModal"
import { CheckoutStayModal } from "../cmps/CheckoutStayModal"

// import { PaymentForm } from "../cmps/PaymentForm"

import arrowBack from "../assets/img/icons/arrowback.svg"
import SelectDropdown from "../cmps/SelectDropdown"
import { addOrder } from "../store/actions/order.action"
import { orderService } from "../services/order"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import "../assets/styles/cmps/AbnbGradientBtn.scss"
import { AbnbGradientBtn } from "../cmps/AbnbGradientBtn"



export function OrderCheckout() {
    const [countryModal, setCountryModal] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState(null);
    const { stayId } = useParams()
    const [stay, setStay] = useState(null)
    const [searchParams] = useSearchParams()
    const [orderToEdit, setOrderToEdit] = useState(orderService.getEmptyOrder())
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchStay() {
            try {
                const stay = await stayService.getById(stayId)
                setStay(stay)
            } catch (err) {
                console.error('Failed to fetch stay:', err)
            }
        }
        fetchStay()
    }, [])

    // useEffect(() => {
    //     const order = orderService.getOrderToEditFromSearchParams(searchParams)
    //     setOrderToEdit({ 
    //         ...order, 
    //         stay: {
    // 			_id: stay._id,
    // 			name: stay.name,
    // 			price: stay.price,
    // 		}
    //      })
    // }, [searchParams])

    useEffect(() => {
        if (stay) {
            const order = orderService.getOrderToEditFromSearchParams(searchParams)
            setOrderToEdit({
                ...order,
                stay: {
                    _id: stay._id,
                    name: stay.name,
                    price: stay.price,
                }
            })
        }
    }, [searchParams, stay])

    const order = {
        _id: 'o1225',
        hostId: { _id: 'u102', fullname: "bob", imgUrl: "..." },
        guest: {
            _id: 'u101',
            fullname: 'User 1',
        },
        totalPrice: 160,
        startDate: new Date('2024-08-24T12:30:00'),
        endDate: new Date('2024-09-10T12:30:00'),
        guests: {
            adults: 1,
            kids: 2,
        },
        stay: {
            _id: 'h102',
            name: 'House Of Uncle My',
            price: 80.0,
        },
        msgs: [],
        status: 'pending',
    }

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec'
    ]

    const checkinDate = order.startDate.getDate()
    const checkinMonthIndex = order.startDate.getMonth()
    const checkinMonthShort = months[checkinMonthIndex]
    const formattedCheckinDate = `${checkinMonthShort} ${checkinDate}`

    const checkouDate = order.endDate.getDate()
    const checkoutMonthIndex = order.endDate.getMonth()
    const checkoutMonthShort = months[checkoutMonthIndex]
    const formattedCheckoutDate = `${checkoutMonthShort} ${checkouDate}`

    const checkoutDate =
        (checkinMonthIndex === checkoutMonthIndex) ?
            order.endDate.getDate() : formattedCheckoutDate


    const getTotalGuests = (order) => {
        const { guests } = order
        const { adults, kids } = guests
        const totalGuests = adults + kids
        return totalGuests
    }

    let dateObj = new Date(order.startDate)
    dateObj.setDate(dateObj.getDate() - 14)
    let cancallationDay = dateObj.getDate()
    const cancelMonthIndex = dateObj.getMonth()
    const cancelMonthShort = months[cancelMonthIndex]
    const cancellationDateFormatted = `${cancelMonthShort} ${cancallationDay}`

    let dateObj2 = new Date(order.startDate)
    dateObj2.setDate(dateObj.getDate() - 7)
    let cancallationDay2 = dateObj2.getDate()
    const cancelMonthIndex2 = dateObj2.getMonth()
    const cancelMonthShort2 = months[cancelMonthIndex2]
    const cancellationDateFormatted2 = `${cancelMonthShort2} ${cancallationDay2}`


    function onShowCountries() {
        setCountryModal(true)
    }

    async function onAddOrder() {
        if (!orderToEdit.startDate || !orderToEdit.endDate) return alert('All fields are required')

        try {
            await addOrder(orderToEdit)
            showSuccessMsg('Order added')
            setOrderToEdit(orderService.getEmptyOrder())
        } catch (err) {
            showErrorMsg('Cannot add order')
        }
    }

    return (
        <section className="order-checkout">
            <button className="back"><img src={arrowBack} /></button>
            <h2 className="order-checkout-title">Request to book</h2>
            <section className="checkout-main-content">
                <section className="checkout-your-trip">
                    <section className="order-checkout-top-content">
                        <h2>Your trip</h2>
                        <section>
                            <h3>Dates</h3>
                            <p>{formattedCheckinDate} - {checkoutDate}</p>
                        </section>
                        <section>
                            <h3>Guests</h3>
                            <p>{getTotalGuests(order)} {(getTotalGuests(order) === 1) ? "guest" : "guests"}</p>
                        </section>
                    </section>
                    <hr />

                    <div className="checkout-payment-content">
                        <h2>Pay with</h2>
                        <div className="checkout-select-dropdown">
                            <SelectDropdown />
                        </div>
                        <div className="checkout-user-card">
                            <input placeholder="Card number" value="1234 5678 9012 3456" readOnly={true}></input>
                            <input placeholder="Expiration" value="11/27" readOnly={true}></input>
                            <input placeholder="CVV" value="123" readOnly={true}></input>
                        </div>
                        {/* <PaymentForm /> */}
                        <input className="ZIP-code" placeholder="ZIP code" />
                        <button
                            className="btn-checkout-country"
                            onClick={onShowCountries}>
                            {selectedCountry ? selectedCountry : "Country/region"}
                        </button>
                        {countryModal && <CountrySelectModal setCountryModal={setCountryModal} setSelectedCountry={setSelectedCountry} />}
                    </div>
                    <hr />

                    <section className="checkout-cancellation-policy">
                        <h2>Cancellation Policy</h2>
                        <p><span className="cancellation-policy-bold">{`Free cancellation before 2:00 PM on ${cancellationDateFormatted2}.`}</span>
                            {` Cancel before ${cancellationDateFormatted} for a partial refund.`}
                        </p>
                    </section>
                    <hr />

                    <section className="ground-rules">
                        <h2>Ground rules</h2>
                        <p>We ask every guest to remember a few simple things about what makes a great guest.</p>
                        <ul>
                            <li>Follow the house rules</li>
                            <li>treat your Host's home like your own</li>
                        </ul>
                    </section>
                    <hr />

                    <p className="checkou-host-option">The Host has 24 hours to confirm your reservation. You’ll be charged when the request is accepted.</p>
                    <hr />

                    <p className="checkout-disclaimer">By selecting the button, I agree to the booking terms. I also agree to the updated Terms of Service, Payments Terms of Service, and I acknowledge the Privacy Policy.</p>

                    <AbnbGradientBtn handleClick={onAddOrder} text="Request to book"/>

                </section>
            </section>
            <div className="checkout-stay-modal-container">
                <CheckoutStayModal />
            </div>
        </section>
    )
}