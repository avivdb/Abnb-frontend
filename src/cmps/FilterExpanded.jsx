import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { FilterWhereModal } from "./FilterWhereModal";
import { useSelector } from "react-redux";
import { setFilterBy } from "../store/actions/stay.actions";
import { FilterLocation } from "./FilterLocation";
import FilterDateRangePicker from "./FilterDateRangePicker";
import { FilterAddGuest } from "./FilterAddGuest";

export function FilterExpanded({ setClass }) {

    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])

    const [isWhere, setIsWhere] = useState(false)
    const [isCheckIn, setIsCheckIn] = useState(false)
    const [isCheckOut, setIsCheckOut] = useState(false)
    const [isGuest, setIsGuest] = useState(false)

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
        }
    }

    function handleClick(field) {
        switch (field) {
            case 'where':
                setIsCheckIn(false)
                setIsCheckOut(false)
                setIsGuest(false)

                setIsWhere(true)
                break;

            case 'checkIn':
                setIsCheckOut(false)
                setIsGuest(false)
                setIsWhere(false)

                setIsCheckIn(true)
                break;

            case 'checkOut':
                setIsCheckIn(false)
                setIsGuest(false)
                setIsWhere(false)

                setIsCheckOut(true)
                break;

            case 'guest':
                setIsCheckIn(false)
                setIsCheckOut(false)
                setIsWhere(false)

                setIsGuest(true)
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

    return (

        // <section className={` ${setClass}`}>

        <section className={` ${setClass}`}>

            <div className="where-field field" onClick={() => handleClick('where')}>
                <h2>Where</h2>
                <FilterLocation filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} />
            </div>


            <div className="check-in-field field" onClick={() => handleClick('checkIn')}>
                <h2>Check in</h2>
                <h1>Add dates</h1>
            </div>


            <div className="check-out-field field" onClick={() => handleClick('checkOut')}>
                <h2> Check out</h2>
                <h1>Add dates</h1>
            </div>


            <div className="who-field field" onClick={() => handleClick('guest')}>
                <div className="grid">
                    <h2>Who</h2>
                    <h1>Add guests</h1>
                </div>

                <div className="search-icon-container">
                    <SearchIcon className="search-icon" />
                </div>

            </div>

            {/* </section> */}

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