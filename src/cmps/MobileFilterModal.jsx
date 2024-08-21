import { useSelector } from "react-redux";
import { FilterAddGuest } from "./FilterAddGuest";
import FilterDateRangePicker from "./FilterDateRangePicker";
import { FilterWhereModal } from "./FilterWhereModal";
import { useState } from "react";
import { AbnbGradientBtn } from "./AbnbGradientBtn";
import { setFilterBy } from "../store/actions/stay.actions";
import { useNavigate } from "react-router";


export function MobileFilterModal({ setActivePhoneModal, activePhoneModal }) {

    var filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    var [filterToEdit, setFilterToEdit] = useState({ ...filterBy })
    var [activeModal, setActiveModal] = useState(null)
    const navigate = useNavigate()

    const getModalClassName = () => {
        let filterModalClass = 'filter-modal';
        if (activeModal === 'where') filterModalClass += ' is-where';
        if (activeModal === 'checkIn') filterModalClass += ' is-check-in';
        if (activeModal === 'checkOut') filterModalClass += ' is-check-out';
        if (activeModal === 'guest') filterModalClass += ' is-guest';
        return filterModalClass
    }

    const handleSearch = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setActiveModal(null)
        setActivePhoneModal(false)
        setFilterBy(filterToEdit)
        navigate(`/`)
    }

    return (
        <section className="mobile-filter-modal">
            <section className={`${getModalClassName()} mobile-filter-modal-modals`}>
                <FilterWhereModal filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} setActiveModal={setActiveModal} />
                <hr />
                <FilterDateRangePicker filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} setActiveModal={setActiveModal} />
                <hr />
                <FilterAddGuest filterToEdit={filterToEdit} setFilterToEdit={setFilterToEdit} />
            </section>
            <section className="mobile-filter-modal-footer">
                <AbnbGradientBtn handleClick={(ev) => handleSearch(ev)} text="Search" />
            </section>
        </section>
    )
}