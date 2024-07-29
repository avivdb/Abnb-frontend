import close from "../assets/img/icons/close.png"
import { removeSpaces } from "../services/util.service"

import Airconditioning from "../assets/img/icons/Airconditioning.svg"
import Balcony from "../assets/img/icons/Balcony.svg"
import Beachfront from "../assets/img/icons/Beachfront.svg"
import Bidet from "../assets/img/icons/Bidet.svg"
import Coffee from "../assets/img/icons/Coffee.svg"
import Crib from "../assets/img/icons/Crib.svg"
import EVcharger from "../assets/img/icons/EVcharger.svg"
import Firepit from "../assets/img/icons/Firepit.svg"
import Freeparking from "../assets/img/icons/Freeparking.svg"
import Garden from "../assets/img/icons/Garden.svg"
import Hairdryer from "../assets/img/icons/Hairdryer.svg"
import Hangers from "../assets/img/icons/Hangers.svg"
import Kitchen from "../assets/img/icons/Kitchen.svg"
import Mountainview from "../assets/img/icons/Mountainview.svg"
import Petsallowed from "../assets/img/icons/Petsallowed.svg"
import Pingpongtable from "../assets/img/icons/Pingpongtable.svg"
import Pooltable from "../assets/img/icons/Pooltable.svg"
import Privatepool from "../assets/img/icons/Privatepool.svg"
import Seaview from "../assets/img/icons/Seaview.svg"
import Smokingallowed from "../assets/img/icons/Smokingallowed.svg"
import TV from "../assets/img/icons/TV.svg"
import Washer from "../assets/img/icons/Washer.svg"
import Wifi from "../assets/img/icons/Wifi.svg"
import Wineglasses from "../assets/img/icons/Wineglasses.svg"


const amenitiesUrl = {
  "Airconditioning": Airconditioning,
  "Balcony": Balcony,
  "Beachfront": Beachfront,
  "Bidet": Bidet,
  "Coffee": Coffee,
  "Crib": Crib,
  "EVcharger": EVcharger,
  "Firepit": Firepit,
  "Freeparking": Freeparking,
  "Garden": Garden,
  "Hairdryer": Hairdryer,
  "Hangers": Hangers,
  "Kitchen": Kitchen,
  "Mountainview": Mountainview,
  "Petsallowed": Petsallowed,
  "Pingpongtable": Pingpongtable,
  "Pooltable": Pooltable,
  "Privatepool": Privatepool,
  "Seaview": Seaview,
  "Smokingallowed": Smokingallowed,
  "TV": TV,
  "Washer": Washer,
  "Wifi": Wifi,
  "Wineglasses": Wineglasses
}


export function AmenitiesModal({ setAmenitiesModal, amenities }) {


    function onHideAmenities() {
        setAmenitiesModal(false)
    }

    return (
        <div className="amenities-modal">
            <section className="amenities-modal-header">
            <button onClick={onHideAmenities}>
                <img src={close} />
            </button>
            </section>
            <h1>What this place offers</h1>
            <section className="amenities-modal-list">

                {amenities.map((amenity, index) => (
                    <>
                        <div className="amenity" key={index}>
                            <img
                                src={amenitiesUrl[removeSpaces(amenity)]}
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