import close from "../assets/img/icons/close.png"

export function AmenitiesModal({ setAmenitiesModal, amenities }) {


    function onHideAmenities() {
        setAmenitiesModal(false)
    }

    return (
        <div className="amenities-modal">
            <button onClick={onHideAmenities}>
                <img src={close} />
            </button>
            <h1>What this place offers</h1>
            <section className="amenities-modal-list">

                {amenities.map((amenity, index) => (
                    <>
                        <div className="amenity" key={index}>
                            <img
                                src={`../src/assets/img/icons/${amenity}.svg`}
                                alt={`${amenity} icon`}
                                className="icon"
                            />
                            <h3>{amenity}</h3>
                        </div>
                        <hr />
                    </>
                ))}
            </section>
        </div>
    )
}