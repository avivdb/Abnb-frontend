import { Link } from 'react-router-dom'
import { ImgCarousel } from './ImgCarousel'


export function StayPreview({ stay }) {

    const { _id, loc, rating, price } = stay

    return <Link to={`/stay/${_id}`}>
        <article className="stay-preview">
            <div className="preview-img-container">
                {stay.imgUrls && stay.imgUrls.length > 0 && <ImgCarousel stay={stay} />}
            </div>
            <section className="stay-preview-top">
                <h2>{(loc && loc.city) || ""}, {(loc && loc.country) || ""}</h2>
                <p>&#9733; {rating || "4.3"}</p>
            </section>
            <p className="secondary-content">1000 kilometers away</p>
            <p className="secondary-content">Jan 12-23</p>
            <p><span className="stay-preview-price">₪{price || ""}</span> night</p>
        </article>
    </Link>
}