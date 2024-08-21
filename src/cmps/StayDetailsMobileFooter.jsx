import { AbnbGradientBtn } from "./AbnbGradientBtn"

export function StayDetailsMobileFooter({ stay, handleReserve }) {

    return (
        <section className="stay-details-mobile-footer" >
            <section>
                <p>₪{stay.price}<span>night</span></p>
                <p>&#9733; {stay.rating.toFixed(1)}</p>
            </section>
            <AbnbGradientBtn text={"Reserve"} handleClick={handleReserve} />
        </section>
    )
}
