import { useEffect, useState } from "react"
import { AbnbGradientBtn } from "./AbnbGradientBtn"

export function StayDetailsHeader({ stay, handleReserve }) {

    const [reserveBtn, setReserveBtn] = useState(false)

    useEffect(() => {
        handleScroll()

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])


    function handleScroll() {
        if (window.scrollY > 1850) {
            setReserveBtn(true)
        } else {
            setReserveBtn(false)
        }
    }

    function goto(where) {
        const element = document.getElementById(where)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className="stay-details-header">
            <section className="stay-details-header-links">
                <button onClick={() => goto('photos')}>Photos</button>
                <button onClick={() => goto('amenities')}>Amenities</button>
                <button onClick={() => goto('reviews')}>Reviews</button>
                <button onClick={() => goto('location')}>Location</button>
            </section>
            {reserveBtn &&
                <section className="stay-details-header-reserve">
                    <section>
                        <p>₪{stay.price}<span>night</span></p>
                        {/* <p><span>&#9733; {stay.rating.toFixed(1)}</span>·<span>{stay.reviews.length || ''} reviews</span></p> */}
                    </section>
                    <AbnbGradientBtn text={"Reserve"} handleClick={handleReserve}/>
                </section>
            }
        </div>
    );
}
