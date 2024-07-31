import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterBy, loadStays } from '../store/actions/stay.actions';
import { FilterPriceRange } from './FilterPriceRange';
import PriceChart from './PriceChart';
import { debounce } from '../services/util.service';
import { stayService } from '../services/stay/index';
const { getDefaultFilter } = stayService;

export function FilterAdvanced() {
    const stays = useSelector(storeState => storeState.stayModule.stays);
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy);
    const [filterToEdit, setFilterToEdit] = useState({ ...filterBy });
    const [placeType, setPlaceType] = useState('Any Type');
    const [minPrice, setMinPrice] = useState(40);
    const [maxPrice, setMaxPrice] = useState(3500);
    const [rooms, setRooms] = useState('Any');
    const [beds, setBeds] = useState('Any');
    const [bathrooms, setBathrooms] = useState('Any');
    const [filteredStaysCount, setFilteredStaysCount] = useState(0);

    const placeTypes = ['Any Type', 'Room', 'Entire home'];
    const roomOptions = ['Any', 1, 2, 3, 4, 5, 6, 7, '8+'];
    const amenityOptions = [
        'Airconditioning', 'Balcony', 'Beachfront', 'Bidet', 'Coffee', 'Crib', 'EVcharger',
        'Firepit', 'Freeparking', 'Garden', 'Hairdryer', 'Hangers', 'Kitchen', 'Mountainview',
        'Petsallowed', 'Pingpongtable', 'Pooltable', 'Privatepool', 'Seaview', 'Smokingallowed',
        'TV', 'Washer', 'Wifi', 'Wineglasses'
    ];

    // Debounced function to update the filter state
    const debouncedSetFilterToEdit = debounce((newFilter) => {
        setFilterToEdit((prevState) => ({
            ...prevState,
            ...newFilter
        }));
    }, 1000);

    // Load stays whenever the filter changes
    useEffect(() => {
        loadStays(filterBy, 0, false);
        console.log('filterBy', filterBy);
    }, [filterBy]);

    // Update the filter state whenever minPrice or maxPrice changes
    useEffect(() => {
        debouncedSetFilterToEdit({ minPrice, maxPrice });
    }, [minPrice, maxPrice]);

    // Update the filter state whenever placeType changes
    useEffect(() => {
        if (placeType === 'Any Type') {
            setFilterToEdit(prevState => ({ ...prevState, type: '' }));
        } else {
            setFilterToEdit(prevState => ({ ...prevState, type: placeType }));
        }
    }, [placeType]);

    // Update the count of filtered stays whenever the filter state changes
    useEffect(() => {
        const updateFilteredStaysCount = async () => {
            const filteredStays = await stayService.query(filterToEdit, 0, false);
            setFilteredStaysCount(filteredStays.length);
        };
        updateFilteredStaysCount();
    }, [filterToEdit]);

    // Handle click on place type buttons
    function handleTypeClick(type) {
        setPlaceType(type);
    }

    // Handle clear all filters
    function handleClearAll(ev) {
        ev.preventDefault();
        setFilterToEdit({ txt: '', minPrice: 40, maxPrice: 3500, type: '', rooms: 0, bathrooms: 0, beds: 0, amenities: [] });
        setPlaceType('Any Type');
        setMinPrice(40);
        setMaxPrice(3500);
        setRooms('Any');
        setBeds('Any');
        setBathrooms('Any');
        setFilterBy(getDefaultFilter());
    }

    // Handle show stays button click
    function handleShowStays(ev) {
        ev.preventDefault();
        setFilterBy(filterToEdit);
    }

    // Handle changes in room filters
    function handleRoomChange(ev, value, key) {
        ev.preventDefault();
        console.log('filterToEdit', filterToEdit);
        if (key === 'rooms') setRooms(value);
        if (key === 'beds') setBeds(value);
        if (key === 'bathrooms') setBathrooms(value);
        setFilterToEdit(prevState => ({ ...prevState, [key]: value }));
    }

    // Handle changes in amenity filters
    function handleAmenityChange(ev, amenity) {
        ev.preventDefault();
        setFilterToEdit(prevState => {
            const amenities = prevState.amenities.includes(amenity)
                ? prevState.amenities.filter(a => a !== amenity)
                : [...prevState.amenities, amenity];
            return { ...prevState, amenities };
        });
    }

    return (
        <form className="filter-advanced">
            <header>Filters</header>
            <section className='filters'>
                <section className="filter filter-by-type">
                    <h1>Type of place</h1>
                    <p>Search rooms, entire homes, or any type of place</p>
                    <ul className="filter-by-type-btns">
                        {placeTypes.map(type =>
                            <li
                                key={type}
                                className={placeType === type ? 'selected' : ''}
                                onClick={() => handleTypeClick(type)}
                            >
                                {type}
                            </li>
                        )}
                    </ul>
                </section>

                <section className="filter filter-by-price">
                    <h1>Price range</h1>
                    <p>Nightly prices including fees and taxes</p>
                    <div className='price-chart'>
                        <PriceChart />
                    </div>
                    <FilterPriceRange minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
                </section>

                <section className="filter filter-by-rooms">
                    <h1>Rooms and beds</h1>
                    <div className="filter-by-bedrooms">
                        <p>Bedrooms</p>
                        <div className="btn-group">
                            {roomOptions.map(option => (
                                <button
                                    key={option}
                                    className={rooms === option ? 'selected' : ''}
                                    onClick={(ev) => handleRoomChange(ev, option, 'rooms')}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="filter-by-beds">
                        <p>Beds</p>
                        <div className="btn-group">
                            {roomOptions.map(option => (
                                <button
                                    key={option}
                                    className={beds === option ? 'selected' : ''}
                                    onClick={(ev) => handleRoomChange(ev, option, 'beds')}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-by-bathrooms">
                        <p>Bathrooms</p>
                        <div className="btn-group">
                            {roomOptions.map(option => (
                                <button
                                    key={option}
                                    className={bathrooms === option ? 'selected' : ''}
                                    onClick={(ev) => handleRoomChange(ev, option, 'bathrooms')}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </section>

            <footer>
                <button onClick={handleClearAll} className='clear-btn'>Clear all</button>
                <button onClick={handleShowStays} className='show-places-btn'>Show {filteredStaysCount} {filteredStaysCount > 1 ? 'places' : 'place'}</button>
            </footer>
        </form>
    );
}
