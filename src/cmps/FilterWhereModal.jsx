import image0 from '../assets/img/icons/asset0.jpeg';
import image1 from '../assets/img/icons/asset1.webp';
import image2 from '../assets/img/icons/asset2.webp';
import image3 from '../assets/img/icons/asset3.webp';
import image4 from '../assets/img/icons/asset4.webp';
import image5 from '../assets/img/icons/asset5.webp';

import { useEffect, useState } from "react";
import iconLocation from '../assets/img/icons/location-2952.svg';

export function FilterWhereModal({ filterToEdit, setFilterToEdit }) {

    const [predictions, setPredictions] = useState([]);
    const [isTyping, setIsTyping] = useState(false)
    const searchQuery = filterToEdit.txt


    useEffect(() => {
        setIsTyping(searchQuery.length > 0);
    }, [searchQuery]);

    useEffect(() => {
        if (window.google && searchQuery) {
            const service = new window.google.maps.places.AutocompleteService();
            service.getPlacePredictions({ input: searchQuery, language: 'en' }, (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    setPredictions(predictions.map(prediction => prediction.description));
                } else {
                    setPredictions([]);
                }
            });
        }
    }, [searchQuery]);


    return (
        <section className={`where-modal ${isTyping ? 'is-typing' : ''}`}>

            <div className="recent-search">

                <h1>Recent searches</h1>

                <ul className='prediction-list'>
                    {predictions.map((prediction, index) => (
                        <li className='prediction-item' key={index}
                            onClick={() => setFilterToEdit({ ...filterToEdit, txt: prediction })}>
                            <span className='icon-location'><img src={iconLocation} /></span>
                            {prediction}
                        </li>
                    ))}
                </ul>

            </div>
            {/* {!isTyping && */}
            <div className={`search-by-region ${isTyping ? 'is-typing' : ''}`}>

                <h1>Search by region</h1>

                <div className="regions">
                    <div className="where-card" onClick={() => setFilterToEdit({ ...filterToEdit, txt: prediction })}>
                        <img src={image0} />
                        <h2>I'm flexsible</h2>
                    </div>

                    <div className="where-card" onClick={() => setFilterToEdit({ ...filterToEdit, txt: 'Europe' })}>
                        <img src={image1} />
                        <h2> Europe</h2>

                    </div>

                    <div className="where-card" onClick={() => setFilterToEdit({ ...filterToEdit, txt: 'Italy' })}>
                        <img src={image2} />
                        <h2> Italy</h2>

                    </div>

                    <div className="where-card" onClick={() => setFilterToEdit({ ...filterToEdit, txt: 'United States' })}>
                        <img src={image3} />
                        <h2> United States</h2>

                    </div>

                    <div className="where-card" onClick={() => setFilterToEdit({ ...filterToEdit, txt: 'Greece' })}>
                        <img src={image4} />
                        <h2> Greece</h2>

                    </div>

                    <div className="where-card" onClick={() => setFilterToEdit({ ...filterToEdit, txt: 'South America' })}>
                        <img src={image5} />
                        <h2> South America</h2>

                    </div>

                </div>

            </div>
            {/* } */}
        </section >
    )
}
