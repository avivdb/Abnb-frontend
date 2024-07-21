
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
// import '../assets/styles/cmps/DateRangePicker.scss'
import dayjs from 'dayjs'

export function DateRangePickerInOrder({ checkin, checkout, setCheckinDate, setCheckoutDate }) {
    const [startDate, setStartDate] = useState(checkin)
    const [endDate, setEndDate] = useState(checkout)

    useEffect(() => {
        console.log('startDate:', startDate)
        console.log('endDate:', endDate)
    }, [startDate, endDate])

    function handleSelect(dates){
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
        setCheckinDate(start)
        setCheckoutDate(end)
    
        console.log('startDate', startDate)
        console.log('endDate', endDate)
        console.log('checkin', checkin)
        
    }

    return (
        <div className="date-range-wrapper">
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

