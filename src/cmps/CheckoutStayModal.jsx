

export function CheckoutStayModal({ stay, order }) {

    function calculateNights(checkin, checkout) {
        const checkinDate = new Date(checkin)
        const checkoutDate = new Date(checkout)
        const differenceInTime = checkoutDate - checkinDate
        const differenceInDays = differenceInTime / (1000 * 3600 * 24)
        return differenceInDays
    }

    if (!stay) {
        return null
    }

    return (
        <section className="checkout-stay-modal">
            <section className="checkout-stay-modal-top">
                <img src={stay.imgUrls[0]} />
                <section>
                    <p>{stay.name}</p>
                    <p>{stay.type}</p>
                    <p>&#9733; {stay.rating}<span> (17 reviews)</span></p>
                </section>
            </section>
            <hr />
                <section className="price-details-content">
                <h1>Price details</h1>
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
    );
}
