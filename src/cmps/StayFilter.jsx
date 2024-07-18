// import { InputAdornment, TextField } from '@mui/material'
// import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { useState, useEffect } from 'react'
import { setFilterBy } from '../store/actions/stay.actions'
import { useSelector } from 'react-redux';
import ResponsiveDatePickers from './ResponsiveDatePickers';
import AirbnbDateRangePicker from './AirbnbDateRangePicker';
// import { MyDateRangePicker } from './MyDateRangePicker';

export function StayFilter() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])

    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '' })
    }

    // function clearSort() {
    //     setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
    // }

    return (
        <section className="stay-filter">
            {<TextField
                name='txt'
                variant="outlined"
                placeholder="Search destinations"
                value={filterToEdit.txt}
                onChange={handleChange}

                sx={{
                    width: '100%',
                    marginRight: '10px',
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '32px',
                    }
                }}
            />}
            {/* <ResponsiveDatePickers /> */}
            <AirbnbDateRangePicker />
            {/* <MyDateRangePicker /> */}
        </section>
    )
}