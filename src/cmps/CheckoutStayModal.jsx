import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { stayService } from '../services/stay'

export function CheckoutStayModal() {
    const { stayId } = useParams()
    const [stay, setStay] = useState(null)

    useEffect(() => {
        stayService.getById(stayId)
            .then(data => {
                setStay(data)
            })
            .catch(error => {
                console.error('Error fetching stay:', error)
                setStay(null)
            })
    }, [stayId])

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
                    <h3>₪{stay.price} x {17} nights</h3>
                    <h3>₪{stay.price * 17}</h3>
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
                    <p>₪{stay.price * 17 + 500 + 107}</p>
                </div>
                </section>
        </section>
    );
}
