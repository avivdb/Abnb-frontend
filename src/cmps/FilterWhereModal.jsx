import image0 from '../assets/img/icons/asset0.jpeg';
import image1 from '../assets/img/icons/asset1.webp';
import image2 from '../assets/img/icons/asset2.webp';
import image3 from '../assets/img/icons/asset3.webp';
import image4 from '../assets/img/icons/asset4.webp';
import image5 from '../assets/img/icons/asset5.webp';

import search from '../assets/img/icons/search.svg';


import { useEffect, useState } from "react";
import iconLocation from '../assets/img/icons/location-2952.svg';
import { useMediaQuery } from '@mui/material';

export function FilterWhereModal({ filterToEdit, setFilterToEdit, setActiveModal }) {

    const [predictions, setPredictions] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const searchQuery = filterToEdit.txt

    const randomLocations = ["Paris", "New York", "Tokyo", "Sydney", "Cape Town", "Moscow", "Rio de Janeiro", "Toronto", "Berlin", "Dubai"]

    useEffect(() => {
        setIsTyping(searchQuery.length > 0)
    }, [searchQuery])

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || []
        // console.log('storedSearches', storedSearches)
        setRecentSearches(storedSearches)
    }, [])

    useEffect(() => {
        if (window.google && searchQuery) {
            const service = new window.google.maps.places.AutocompleteService();
            service.getPlacePredictions({ input: searchQuery, language: 'en' }, (predictions, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                    setPredictions(predictions.map(prediction => prediction.description))
                } else {
                    setPredictions([])
                }
            })
        }
    }, [searchQuery])

    const handleSearchClick = (searchText) => {
        if (searchText === "I'm flexible") {
            searchText = randomLocations[Math.floor(Math.random() * randomLocations.length)]
        }

        setFilterToEdit({ ...filterToEdit, txt: searchText })
        setActiveModal("checkIn")
        setRecentSearches(prev => {
            const updatedSearches = [searchText, ...prev.filter(item => item !== searchText)].slice(0, 5)
            localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
            return updatedSearches
        })
    }


    return (
        <section className={`where-modal ${isTyping ? 'is-typing' : ''}`} style={isSmallScreen ? { display: 'flex', flexDirection: 'column' } : { display: 'grid' }}>
            {!isSmallScreen && <div className="recent-search">
                <h1>Recent searches</h1>
                <ul className='prediction-list'>
                    {predictions.length > 0 ? (
                        predictions.map((prediction, index) => (
                            <li className='prediction-item' key={index}
                                onClick={() => handleSearchClick(prediction)}>
                                <span className='icon-location'><img src={iconLocation} alt="location icon" /></span>
                                {prediction}
                            </li>
                        ))
                    ) : (
                        recentSearches.map((search, index) => (
                            <li className='prediction-item' key={index}
                                onClick={() => handleSearchClick(search)}>
                                <span className='icon-location'><img src={iconLocation} alt="location icon" /></span>
                                {search}
                            </li>
                        ))
                    )}
                </ul>
            </div>}
            {isSmallScreen &&
                <section className="sect-mobile-destination-input">
                    <label htmlFor="mobile-destination-input"><img src={search} alt="Search" /></label>
                    <input id="mobile-destination-input" className="mobile-destination-input" placeholder='Search destinations' onChange={(event) => { handleSearchClick(event.target.value) }} />
                </section>
            }
            <div className={`search-by-region ${isTyping ? 'is-typing' : ''}`}>
                {!isSmallScreen && <h1>Search by region</h1>}
                <div className="regions">
                    <div className="where-card" onClick={() => handleSearchClick("I'm flexible")}>
                        <img src={image0} alt="I'm flexible" />
                        <h2>I'm flexible</h2>
                    </div>
                    <div className="where-card" onClick={() => handleSearchClick('Europe')}>
                        <img src={image1} alt="Europe" />
                        <h2>Europe</h2>
                    </div>
                    <div className="where-card" onClick={() => handleSearchClick('Italy')}>
                        <img src={image2} alt="Italy" />
                        <h2>Italy</h2>
                    </div>
                    <div className="where-card" onClick={() => handleSearchClick('United States')}>
                        <img src={image3} alt="United States" />
                        <h2>United States</h2>
                    </div>
                    <div className="where-card" onClick={() => handleSearchClick('Greece')}>
                        <img src={image4} alt="Greece" />
                        <h2>Greece</h2>
                    </div>
                    <div className="where-card" onClick={() => handleSearchClick('South America')}>
                        <img src={image5} alt="South America" />
                        <h2>South America</h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
