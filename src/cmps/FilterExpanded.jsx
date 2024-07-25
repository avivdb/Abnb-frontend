import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { FilterWhereModal } from "./FilterWhereModal";
import { useSelector } from "react-redux";
import { setFilterBy } from "../store/actions/stay.actions";
import { FilterLocation } from "./FilterLocation";
import FilterDateRangePicker from "./FilterDateRangePicker";
import { FilterAddGuest } from "./FilterAddGuest";
import { getGuestsTitle, getMonthName } from "../services/util.service";

export function FilterExpanded({ setClass }) {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy);
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy));
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        setFilterBy(filterToEdit);
    }, [filterToEdit]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setActiveField(null);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function handleClick(field) {
        setActiveField(prevField => (prevField === field ? null : field));
    }

    function getModalClassName() {
        let filterModalClass = 'filter-modal';
        if (activeField) filterModalClass += ` is-${activeField}`;
        return filterModalClass;
    }



    return (
        <section className={` ${setClass}`}>
            <div className="where-field field" onClick={() => handleClick('where')}>
                <h2>Where</h2>
                <FilterLocation filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} />
            </div>

            <div className="check-in-field field" onClick={() => handleClick('checkIn')}>
                <h2>Check in</h2>
                {filterToEdit.checkIn ? <h1>{`${getMonthName(filterToEdit.checkIn.getMonth())} ${filterToEdit.checkIn.getDate()}`}</h1> : <h1>Add dates</h1>}
            </div>

            <div className="check-out-field field" onClick={() => handleClick('checkOut')}>
                <h2>Check out</h2>
                {filterToEdit.checkOut ? <h1>{`${getMonthName(filterToEdit.checkOut.getMonth())} ${filterToEdit.checkOut.getDate()}`}</h1> : <h1>Add dates</h1>}
            </div>

            <div className="who-field field" onClick={() => handleClick('guest')}>
                <div className="grid">
                    <h2>Who</h2>
                    <h1>{getGuestsTitle(filterToEdit)}</h1>
                </div>

                <div className="search-icon-container">
                    <SearchIcon className="search-icon" />
                </div>
            </div>

            {(activeField) &&
                <section className={getModalClassName()}>
                    {activeField === 'where' && <FilterWhereModal filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} />}
                    {(activeField === 'checkIn' || activeField === 'checkOut') && <FilterDateRangePicker filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} />}
                    {activeField === 'guest' && <FilterAddGuest filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} />}
                </section>
            }
        </section>
    );
}
