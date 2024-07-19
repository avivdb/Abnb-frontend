
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import '../assets/styles/cmps/DateRangePicker.scss';
import dayjs from 'dayjs';

export default function DateRangePicker() {
    const [startDate, setStartDate] = useState(dayjs().toDate());
    const [endDate, setEndDate] = useState(dayjs().toDate());

    const handleSelect = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div className="date-range-wrapper">
            <DatePicker
                // selected={startDate}
                onChange={handleSelect}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                minDate={dayjs().toDate()}
                inline
                monthsShown={2}
            />
        </div>
    );
}

