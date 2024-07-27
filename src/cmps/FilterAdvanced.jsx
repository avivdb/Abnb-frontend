import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setFilterBy, loadStays } from '../store/actions/stay.actions';
import { FilterPriceRange } from './FilterPriceRange';
import PriceChart from './PriceChart';
import { debounce } from '../services/util.service';

export function FilterAdvanced() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [filterToEdit, setFilterToEdit] = useState({ ...filterBy })
    const [placeType, setPlaceType] = useState('Any Type')
    const [minPrice, setMinPrice] = useState(40)
    const [maxPrice, setMaxPrice] = useState(13000)
    const placeTypes = ['Any Type', 'Room', 'Entire home']

    const debouncedSetFilterToEdit = debounce((newFilter) => {
        setFilterToEdit((prevState) => ({
            ...prevState,
            ...newFilter
        }));
    }, 1000)

    useEffect(() => {
        loadStays(filterBy)
        console.log('filterBy', filterBy)
    }
        , [filterBy])

    useEffect(() => {
        debouncedSetFilterToEdit({ minPrice, maxPrice })
    }, [minPrice, maxPrice])

    useEffect(() => {
        if (placeType === 'Any Type') {
            setFilterToEdit({ ...filterToEdit, type: '' })
        } else {
            setFilterToEdit({ ...filterToEdit, type: placeType })
        }
    }, [placeType])

    function handleTypeClick(type) {
        setPlaceType(type)
    }

    function handleClearAll() {
        setFilterToEdit({ txt: '', minPrice: 40, maxPrice: 13000, type: '' })
        setPlaceType('Any Type')
        setMinPrice(40)
        setMaxPrice(13000)
        setFilterBy(filterToEdit)
    }

    function handleShowStays() {
        setFilterBy(filterToEdit)
        // loadStays(filterToEdit)
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
            </section>

            <footer>
                <button onClick={handleClearAll} className='clear-btn'>Clear all</button>
                <button onClick={handleShowStays} className='show-places-btn'>Show {stays.length} {stays.length > 1 ? 'places' : 'place'}</button>
            </footer>

        </form>
    );
}
