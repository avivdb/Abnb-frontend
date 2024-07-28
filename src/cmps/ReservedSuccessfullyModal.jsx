import { formatDate, calculateNights } from '../services/util.service.js'


export function ReservedSuccessfullyModal({ order, stay, onCloseReservedModal }) {

    return (
        <section className="reserved-successfully-modal">
            <h1>Reserved successfully</h1>
            <hr />
            <p className="subtitle">You can follow order status in Trips page</p>
            <section className="reserved-successfully-modal-content">
                <section className="reserved-successfully-modal-text">
                    <h2>Reservation details</h2>
                    <section>
                        <h3>Trip dates:</h3>
                        <p>{formatDate(order.startDate)} - {formatDate(order.endDate)}</p>
                        <h3>Guests</h3>
                        <p>
                            {order.guestCounts.adults !== 0 && `${order.guestCounts.adults} ${order.guestCounts.adults === 1 ? "adult" : "adults"}`}
                            {order.guestCounts.children !== 0 && `, ${order.guestCounts.children} ${order.guestCounts.children === 1 ? "child" : "children"}`}
                            {order.guestCounts.infants !== 0 && `, ${order.guestCounts.infants} ${order.guestCounts.infants === 1 ? "infant" : "infants"}`}
                            {order.guestCounts.pets !== 0 && `, ${order.guestCounts.pets} ${order.guestCounts.pets === 1 ? "pet" : "pets"}`}
                        </p>
                    </section>
                    <hr />
                    <section>
                        <h3>Price details</h3>
                        <div>
                            <h3>₪{stay.price} x {calculateNights(order.startDate, order.endDate)} nights</h3>
                            <h3>₪{stay.price * calculateNights(order.startDate, order.endDate)}</h3>
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
                            <p>Total</p>
                            <p>₪{order.totalPrice}</p>
                        </div>
                    </section>
                </section>
                <section className="reserved-successfully-modal-card">
                    <img src={stay.imgUrls[0]} />
                    <section>
                        <p>{stay.name}</p>
                        <p>{stay.loc.city}, {stay.loc.country}</p>
                    </section>
                </section>
            </section>
            <button onClick={onCloseReservedModal}>Close</button>
        </section>
    )
}