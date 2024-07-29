
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/cmps/DateRangePicker.scss';
import dayjs from 'dayjs';

export default function FilterDateRangePicker({ filterToEdit, setFilterToEdit, setActiveModal }) {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    useEffect(() => {
        console.log('startDate:', startDate)
        console.log('endDate:', endDate)
    }, [startDate, endDate])

    function handleSelect(dates) {
        const [start, end] = dates

        setStartDate(start)
        if (start !== null) setActiveModal("checkOut")

        setEndDate(end)
        setFilterToEdit({ ...filterToEdit, checkIn: start, checkOut: end })
        console.log('startDate', startDate)
        console.log('endDate', endDate)
        console.log(filterToEdit)
        if (end !== null) setActiveModal("guest")
    };

    return (
        <div className="date-range-wrapper">
            <div className='date-range-btns'>
                <button>Dates</button>
                <button>Month</button>
                <button>Flexible</button>
            </div>
            <DatePicker
                selected={startDate}
                onChange={handleSelect}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                minDate={dayjs().toDate()}
                inline
                monthsShown={2}
            />
        </div>
    )
}

