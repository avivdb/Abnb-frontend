
export function Amenities(stay) {

    return (
        <article>
            <h2>What this place offers</h2>
            <section className="amenities">
                <div>
                    <img src="../src/assets/img/icons/beach.svg" className="icon" />
                    <h3>Beach access – Beachfront</h3>
                </div>
                <div>
                    <img src="../src/assets/img/icons/wifi.svg"  className="icon"/>
                    <h3>Wifi</h3>
                </div>
                <div>
                    <img src="../src/assets/img/icons/pool.svg"  className="icon"/>
                    <h3>Private outdoor pool - available all year, open 24 hours, lap pool</h3>
                </div>
                <div>
                    <img src="../src/assets/img/icons/washer.svg" className="icon" />
                    <h3>Free washer – In unit</h3>
                </div>
                <div>
                    <img src="../src/assets/img/icons/balcony.svg" className="icon" />
                    <h3>Private patio or balcony</h3>
                </div>
                <div>
                    <img src="../src/assets/img/icons/kitchen.svg" className="icon" />
                    <h3>Kitchen</h3>
                </div>
                <div>
                    <img src="../src/assets/img/icons/car.svg" className="icon" />
                    <h3>Free residential garage on premises</h3>
                </div>
                <div>
                    <img src="../src/assets/img/icons/tv.svg" className="icon" /> 
                    <h3>TV</h3>
                </div>
                <div>
                    <img src="../src/assets/img/icons/air.svg" className="icon" />
                    <h3>Central air conditioning</h3>
                </div>
                <div>
                    <img src="../src/assets/img/icons/Carbon-monoxide-alarm.svg" className="icon" />
                    <h3>Carbon monoxide alarm</h3>
                </div>
                <button className="btn-amenities">Show all 62 amenities</button>

            </section>
        </article>
    )
}