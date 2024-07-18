// import { Link } from 'react-router-dom'
// import { ImgCarousel } from './ImgCarousel'


// export function StayPreview({ stay }) {
//     return <Link to={`/stay/${stay._id}`}>
//         <article className="stay-preview">
//             <ImgCarousel stay={stay}/>
//             {/* <img src={stay.imgUrls[0]} /> */}
//             <section className="stay-preview-top">
//                 <h2>{stay.loc.city}, {stay.loc.country}</h2>
//                 <p>&#9733; {stay.rating}</p>
//             </section>
//             <p className="secondary-content">1000 kilometers away</p>
//             <p className="secondary-content">Jan 12-23</p>
//             <p><span className="stay-preview-price">₪{stay.price}</span> night</p>
//         </article>
//     </Link>
// }




// TO TEST CAROUSEL WITHOUT LINK ////////////////////////////


import { Link } from 'react-router-dom'
import { ImgCarousel } from './ImgCarousel'


export function StayPreview({ stay }) {
    return <article className="stay-preview">
        <ImgCarousel stay={stay} />
        <Link to={`/stay/${stay._id}`}>
            <section className="stay-preview-details">
                <section className="flex-column">
                    <section className="stay-preview-top">
                        <h2>{stay.loc.city}, {stay.loc.country}</h2>
                        <p>&#9733; {stay.rating}</p>
                    </section>
                    <p className="secondary-content">1000 kilometers away</p>
                    <p className="secondary-content">Jan 12-23</p>
                </section>
                <p><span className="stay-preview-price">₪{stay.price}</span> night</p>
            </section>
        </Link>
    </article>
}