import { useSelector } from "react-redux"

export function StayGallery() {

    const stay = useSelector(storeState => storeState.stayModule.stay)
    console.log(stay)


    return (
        <section className='complete-photo-gallery'>
            <h1>{stay.name}</h1>
            {stay.imgUrls.map((imgUrl, idx) => (
                <img key={idx} src={imgUrl} />))}
        </section>
    )
}