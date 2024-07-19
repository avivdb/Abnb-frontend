import { useState, useEffect } from 'react'
import { setFilterBy } from '../store/actions/stay.actions'
import { useSelector } from 'react-redux';


export function StayFilter() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value

        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    return (
        <input
            name='txt'
            placeholder="Search destinations"
            value={filterToEdit.txt}
            onChange={handleChange}
            className="stay-filter"
        />
    )

}