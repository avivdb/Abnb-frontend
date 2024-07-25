import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { FilterWhereModal } from "./FilterWhereModal";
import { useSelector } from "react-redux";
import { setFilterBy } from "../store/actions/stay.actions";
import { FilterLocation } from "./FilterLocation";
import FilterDateRangePicker from "./FilterDateRangePicker";
import { FilterAddGuest } from "./FilterAddGuest";
import { getMonthName } from "../services/util.service";
import { AbnbGradientBtn } from "./AbnbGradientBtn";

export function FilterExpanded({ setClass }) {

    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit, filterToEdit.guest])

    const [isWhere, setIsWhere] = useState(false)
    const [isCheckIn, setIsCheckIn] = useState(false)
    const [isCheckOut, setIsCheckOut] = useState(false)
    const [isGuest, setIsGuest] = useState(false)

    const [ModalActive, setModalActive] = useState(false)
    const [selectedModal, setSelectedModal] = useState(null)


    useEffect(() => {
        handleScroll()

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    function handleScroll() {

        if (window.scrollY > 50) {
            setIsCheckIn(false)
            setIsCheckOut(false)
            setIsGuest(false)
            setIsWhere(false)
            setModalActive(false)
            setSelectedModal(null)
        }
    }

    function handleClick(field) {
        setModalActive(true)
        switch (field) {
            case 'where':
                setIsCheckIn(false)
                setIsCheckOut(false)
                setIsGuest(false)

                setIsWhere(true)
                setSelectedModal('where')
                break;

            case 'checkIn':
                setIsCheckOut(false)
                setIsGuest(false)
                setIsWhere(false)

                setIsCheckIn(true)
                setSelectedModal('checkIn')
                break;

            case 'checkOut':
                setIsCheckIn(false)
                setIsGuest(false)
                setIsWhere(false)

                setIsCheckOut(true)
                setSelectedModal('checkOut')
                break;

            case 'guest':
                setIsCheckIn(false)
                setIsCheckOut(false)
                setIsWhere(false)

                setIsGuest(true)
                setSelectedModal('guest')
                break;
            default:
                break;
        }

    }

    function getModalClassName() {
        let filterModalClass = 'filter-modal'
        if (isWhere) filterModalClass += ' is-where'
        if (isCheckIn) filterModalClass += ' is-check-in'
        if (isCheckOut) filterModalClass += ' is-check-out'
        if (isGuest) filterModalClass += ' is-guest'
        return filterModalClass
    }

    function getGuestsTitle() {
        const { adult = 0, children = 0, infant = 0, pet = 0 } = filterToEdit.guest || {};
        const numGuest = adult + children;

        const guestStr = numGuest === 1 ? 'guest' : 'guests';
        const infantStr = infant === 1 ? 'infant' : 'infants';
        const petStr = pet === 1 ? 'pet' : 'pets';

        let title = numGuest > 0 ? `${numGuest} ${guestStr}` : 'Add guests';
        if (infant > 0) {
            title += `, ${infant} ${infantStr}`;
        }
        if (pet > 0) {
            title += `, ${pet} ${petStr}`;
        }

        return title || 'Add guests';
    }

    function onSerach(ev) {
        ev.preventDefault()
        ev.stopPropagation()

        if (isWhere) setIsWhere(false)
        if (isCheckIn) setIsCheckIn(false)
        if (isCheckOut) setIsCheckOut(false)
        if (isGuest) setIsGuest(false)

        setModalActive(false)
        setSelectedModal(null)
    }




    return (


        <section className={` ${setClass} ${ModalActive ? "active" : ""} `}>

            <div className={`where-field field ${ModalActive && selectedModal !== 'where' ? "active" : ""} ${selectedModal === 'where' ? "selected-active" : ""}`}
                onClick={() => handleClick('where')}>
                <h2>Where</h2>
                <FilterLocation filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} />
            </div>


            <div className={`check-in-field field ${ModalActive && selectedModal !== 'checkIn' ? "active" : ""} ${selectedModal === 'checkIn' ? "selected-active" : ""}`}
                onClick={() => handleClick('checkIn')}>
                <h2>Check in</h2>
                {filterToEdit.checkIn ? <h1>{`${getMonthName(filterToEdit.checkIn.getMonth())} ${filterToEdit.checkIn.getDate()}`}</h1> : <h1>Add dates</h1>}
            </div>


            <div className={`check-out-field field ${ModalActive && selectedModal !== 'checkOut' ? "active" : ""} ${selectedModal === 'checkOut' ? "selected-active" : ""}`}
                onClick={() => handleClick('checkOut')}>
                <h2> Check out</h2>
                {filterToEdit.checkOut ? <h1>{`${getMonthName(filterToEdit.checkOut.getMonth())} ${filterToEdit.checkOut.getDate()}`}</h1> : <h1>Add dates</h1>}
            </div>


            <div className={`who-field field ${ModalActive && selectedModal !== 'guest' ? "active" : ""} ${selectedModal === 'guest' ? "selected-active" : ""}`}
                onClick={() => handleClick('guest')}>
                <div className="grid">
                    <h2>Who</h2>
                    <h1>{getGuestsTitle()}</h1>
                </div>

                {ModalActive ?
                    <AbnbGradientBtn handleClick={(ev) => onSerach(ev)} text="Search" /> :
                    <div className="search-icon-container"
                        onClick={(ev) => onSerach(ev)}>
                        <SearchIcon className="search-icon" />
                    </div>
                }

            </div>

            {
                (isWhere || isCheckIn || isCheckOut || isGuest) &&

                <section className={getModalClassName()}>
                    {isWhere && <FilterWhereModal filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} />}
                    {(isCheckIn || isCheckOut) && <FilterDateRangePicker filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} />}
                    {isGuest && <FilterAddGuest filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} />}
                </section>
            }
        </section>
    )
}