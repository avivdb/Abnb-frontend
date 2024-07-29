import { Link } from 'react-router-dom'
import { ImgCarousel } from './ImgCarousel'
import { useState } from 'react'

import heartempty from "../assets/img/icons/heartempty.svg"
import heartfull from "../assets/img/icons/heartfull.svg"
import { stayService } from '../services/stay'
import { formatDateRange, getDistanceBetweenLocations } from '../services/util.service.js'


export default function StayPreview({ stay }) {

    const [wishlist, setWishlist] = useState(false)
    const { _id, loc, rating, price } = stay

    function onToggleWishlist(event, stay) {
        event.preventDefault()
        event.stopPropagation()

        wishlist ? setWishlist(false) : setWishlist(true)
        stayService.toggleWishlist(stay)
    }

    return (
        <Link to={`/stay/${_id}`}>

            <article className="stay-preview">

                <div className="preview-img-container">
                    {stay.imgUrls && stay.imgUrls.length > 0 && <ImgCarousel stay={stay} />}
                </div>
                <section className="stay-preview-top">
                    <h2>{(loc && loc.city) || ""}, {(loc && loc.country) || ""}</h2>
                    <p>&#9733; {(rating || 4.3).toFixed(1)}</p>
                </section>
                <p className="secondary-content">{`${getDistanceBetweenLocations(32.0853, 34.7818, loc.lat, loc.lan)} kilometers away`}</p>
                {/* <p className="secondary-content">{`${stay.distance.toLocaleString()} kilometers away`}</p> */}
                <p className="secondary-content">{formatDateRange(stay.defaultCheckin, stay.defaultCheckout)}</p>
                <p className="stay-preview-price" ><span>{`₪${price || ""}`}</span>night</p>
            </article>
        </Link>
    )
}
