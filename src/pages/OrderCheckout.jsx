import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { stayService } from "../services/stay/stay.service.local";
import { formatDate, formatDateRange, getDateTwoWeeksBefore, calculateNights } from '../services/util.service.js'

import { CountrySelectModal } from "../cmps/CountrySelectModal";
import { CheckoutStayModal } from "../cmps/CheckoutStayModal";

import arrowBack from "../assets/img/icons/arrowback.svg";
import SelectDropdown from "../cmps/SelectDropdown";
import { addOrder } from "../store/actions/order.action";
import { orderService } from "../services/order";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import "../assets/styles/cmps/AbnbGradientBtn.scss";
import { AbnbGradientBtn } from "../cmps/AbnbGradientBtn";

import { loadStay } from "../store/actions/stay.actions";
import { ReservedSuccessfullyModal } from "../cmps/ReservedSuccessfullyModal.jsx";
import { userService } from "../services/user";

export function OrderCheckout() {
    const [countryModal, setCountryModal] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [reservedModal, setReservedModal] = useState(false)


    const { stayId } = useParams()
    const [searchParams] = useSearchParams()
    const [order, setOrder] = useState(orderService.getOrderToEditFromSearchParams(searchParams))
    const navigate = useNavigate()

    const stay = useSelector(storeState => storeState.stayModule.stay)

    useEffect(() => {
        loadStay(stayId)
    }, [stayId])

    useEffect(() => {
        if (stay) {
            setOrder((order) => ({
                ...order,
                stay: {
                    _id: stay._id,
                    name: stay.name,
                    price: stay.price
                },
                host: {
                    _id: stay.host._id,
                    fullname: stay.host.fullname,
                    imgUrl: stay.host.pictureUrl
                },
                guest: { 
                    _id: userService.getLoggedinUser()._id,
                    fullname: userService.getLoggedinUser().fullname,
                },
                msgs: [],
			    status: 'pending' 
            }))
        }
    }, [stay])

    function onShowCountries() {
        setCountryModal(true)
    }

    async function onAddOrder() {
        if (!order.startDate || !order.endDate || !order.stay || !order.stay._id) {
            return alert('All fields are required')
        }
        try {
            await addOrder(order)
            // showSuccessMsg('Order added');
            setReservedModal(true)
            // navigate('/stay/trips');
        } catch (err) {
            // showErrorMsg('Cannot add order');
        }
    }

    function onCloseReservedModal() {
        navigate('/stay/trips')
        setReservedModal(false)
    }

    return (
        <section className="order-checkout">
            <button className="back"><img src={arrowBack} alt="Back" /></button>
            <h2 className="order-checkout-title">Request to book</h2>
            <section className="checkout-main-content">
                <section className="checkout-your-trip">
                    <section className="order-checkout-top-content">
                        <h2>Your trip</h2>
                        <section>
                            <h3>Dates</h3>
                            <p>{formatDateRange(order.startDate, order.endDate)}</p>
                        </section>
                        <section>
                            <h3>Guests</h3>
                            <p>{order.capacity} {(order.capacity === 1) ? "guest" : "guests"}</p>
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
                        <div><h1 className="cancellation-policy-bold">{`Free cancellation before 2:00 PM on ${getDateTwoWeeksBefore(order.startDate, 3)}.`}
                            <span>{` Cancel before ${getDateTwoWeeksBefore(order.startDate, 2)} for a partial refund.`} </span></h1>
                        </div>
                    </section>
                    <hr />

                    <section className="ground-rules">
                        <h2>Ground rules</h2>
                        <p>We ask every guest to remember a few simple things about what makes a great guest.</p>
                        <ul>
                            <li>Follow the house rules</li>
                            <li>Treat your Host's home like your own</li>
                        </ul>
                    </section>
                    <hr />

                    <p className="checkout-host-option">The Host has 24 hours to confirm your reservation. You’ll be charged when the request is accepted.</p>
                    <hr />

                    <p className="checkout-disclaimer">By selecting the button, I agree to the booking terms. I also agree to the updated Terms of Service, Payments Terms of Service, and I acknowledge the Privacy Policy.</p>

                    <AbnbGradientBtn handleClick={onAddOrder} text="Request to book" />
                </section>
            </section>
            <div className="checkout-stay-modal-container">
                <CheckoutStayModal stay={stay} order={order} />
            </div>

            {reservedModal && <ReservedSuccessfullyModal order={order} stay={stay} onCloseReservedModal={onCloseReservedModal} />}
        </section>
    );
}
