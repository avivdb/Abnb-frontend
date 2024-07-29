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
    const [maxPrice, setMaxPrice] = useState(13000);
    const [filteredStaysCount, setFilteredStaysCount] = useState(0);
    const placeTypes = ['Any Type', 'Room', 'Entire home'];

    const debouncedSetFilterToEdit = debounce((newFilter) => {
        setFilterToEdit((prevState) => ({
            ...prevState,
            ...newFilter
        }));
    }, 1000);

    useEffect(() => {
        loadStays(filterBy, 0, false);
        console.log('filterBy', filterBy);
    }, [filterBy]);

    useEffect(() => {
        debouncedSetFilterToEdit({ minPrice, maxPrice });
    }, [minPrice, maxPrice]);

    useEffect(() => {
        if (placeType === 'Any Type') {
            setFilterToEdit(prevState => ({ ...prevState, type: '' }));
        } else {
            setFilterToEdit(prevState => ({ ...prevState, type: placeType }));
        }
    }, [placeType]);

    useEffect(() => {
        const updateFilteredStaysCount = async () => {
            const filteredStays = await stayService.query(filterToEdit, 0, false);
            setFilteredStaysCount(filteredStays.length);
        };
        updateFilteredStaysCount();
    }, [filterToEdit]);

    function handleTypeClick(type) {
        setPlaceType(type);
    }

    function handleClearAll(ev) {
        ev.preventDefault();
        setFilterToEdit({ txt: '', minPrice: 40, maxPrice: 13000, type: '' });
        setPlaceType('Any Type');
        setMinPrice(40);
        setMaxPrice(13000);
        setFilterBy(getDefaultFilter());
    }

    function handleShowStays(ev) {
        ev.preventDefault();
        setFilterBy(filterToEdit);
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
                <button onClick={handleShowStays} className='show-places-btn'>Show {filteredStaysCount} {filteredStaysCount > 1 ? 'places' : 'place'}</button>
            </footer>
        </form>
    );
}
