import { Link } from 'react-router-dom'
import { ImgCarousel } from './ImgCarousel'
import { useState } from 'react'

import heartempty from "../assets/img/icons/heartempty.svg"
import heartfull from "../assets/img/icons/heartfull.svg"
import { stayService } from '../services/stay'
import { getRandomDate, getRandomDistance } from '../services/util.service.js'


export function StayPreview({ stay }) {

    const [wishlist, setWishlist] = useState(false)
    const { _id, loc, rating, price } = stay

    function onToggleWishlist(event, stay) {
        event.preventDefault()
        event.stopPropagation()

        wishlist ? setWishlist(false) : setWishlist(true)
        stayService.toggleWishlist(stay)
    }

    // console.log(price)

    return <Link to={`/stay/${_id}`} target="_blank">
        <article className="stay-preview">
            <button className="stay-preview-heart" onClick={(event) => onToggleWishlist(event, stay)}>
                <img src={stay.isWishlist ? heartfull : heartempty} />
            </button>
            <div className="preview-img-container">
                {stay.imgUrls && stay.imgUrls.length > 0 && <ImgCarousel stay={stay} />}
            </div>
            <section className="stay-preview-top">
                <h2>{(loc && loc.city) || ""}, {(loc && loc.country) || ""}</h2>
                <p>&#9733; {rating || "4.3"}</p>
            </section>
            <p className="secondary-content">{`${getRandomDistance()} kilometers away`}</p>
            <p className="secondary-content">{getRandomDate()}</p>
            <p className="stay-preview-price" ><span>{`₪${price || ""}`}</span>night</p>
        </article>
    </Link>
}