import { useEffect, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { FilterWhereModal } from "./FilterWhereModal";
import { useSelector, useDispatch } from "react-redux";
import { setFilterBy } from "../store/actions/stay.actions";
import { FilterLocation } from "./FilterLocation";
import FilterDateRangePicker from "./FilterDateRangePicker";
import { FilterAddGuest } from "./FilterAddGuest";
import { getMonthName, getGuestsTitle, getParams } from "../services/util.service";
import { AbnbGradientBtn } from "./AbnbGradientBtn";
import { useNavigate } from 'react-router-dom';

export function FilterExpanded({ setClass }) {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [filterToEdit, setFilterToEdit] = useState({ ...filterBy })
    const [activeModal, setActiveModal] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setActiveModal(null)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleClick = (field) => {
        setActiveModal(field === activeModal ? null : field)
    }

    const getModalClassName = () => {
        let filterModalClass = 'filter-modal';
        if (activeModal === 'where') filterModalClass += ' is-where'
        if (activeModal === 'checkIn') filterModalClass += ' is-check-in'
        if (activeModal === 'checkOut') filterModalClass += ' is-check-out'
        if (activeModal === 'guest') filterModalClass += ' is-guest'
        return filterModalClass;
    }

    const handleSearch = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setActiveModal(null)
        setFilterBy(filterToEdit)
        const params = getParams(filterToEdit);
        if (params) {
            navigate(`/s/${params}`);
        }
    }

    return (
        <section className={`${setClass} ${activeModal ? "active" : ""}`}>
            <div
                className={`where-field field ${activeModal && activeModal !== 'where' ? "active" : ""} ${activeModal === 'where' ? "selected-active" : ""}`}
                onClick={() => handleClick('where')}
            >
                <h2>Where</h2>
                <FilterLocation filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} />
            </div>

            <div
                className={`check-in-field field ${activeModal && activeModal !== 'checkIn' ? "active" : ""} ${activeModal === 'checkIn' ? "selected-active" : ""}`}
                onClick={() => handleClick('checkIn')}
            >
                <h2>Check in</h2>
                {filterToEdit.checkIn ? <h1>{`${getMonthName(filterToEdit.checkIn.getMonth())} ${filterToEdit.checkIn.getDate()}`}</h1> : <h1>Add dates</h1>}
            </div>

            <div
                className={`check-out-field field ${activeModal && activeModal !== 'checkOut' ? "active" : ""} ${activeModal === 'checkOut' ? "selected-active" : ""}`}
                onClick={() => handleClick('checkOut')}
            >
                <h2>Check out</h2>
                {filterToEdit.checkOut ? <h1>{`${getMonthName(filterToEdit.checkOut.getMonth())} ${filterToEdit.checkOut.getDate()}`}</h1> : <h1>Add dates</h1>}
            </div>

            <div
                className={`who-field field ${activeModal && activeModal !== 'guest' ? "active" : ""} ${activeModal === 'guest' ? "selected-active" : ""}`}
                onClick={() => handleClick('guest')}
            >
                <div className="grid">
                    <h2>Who</h2>
                    <h1>{getGuestsTitle(filterToEdit)}</h1>
                </div>
                {activeModal ? (
                    <AbnbGradientBtn handleClick={(ev) => handleSearch(ev)} text="Search" />
                ) : (
                    <div className="search-icon-container" onClick={(ev) => handleSearch(ev)}>
                        <SearchIcon className="search-icon" />
                    </div>
                )}
            </div>

            {activeModal && (
                <section className={getModalClassName()}>
                    {activeModal === 'where' && <FilterWhereModal filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} setActiveModal={setActiveModal}/>}
                    {(activeModal === 'checkIn' || activeModal === 'checkOut') && <FilterDateRangePicker filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} setActiveModal={setActiveModal} />}
                    {activeModal === 'guest' && <FilterAddGuest filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} />}
                </section>
            )}
        </section>
    )
}
