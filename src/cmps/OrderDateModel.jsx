
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import dayjs from 'dayjs'

export function OrderDateModel({ checkin, checkout, setCheckinDate, setCheckoutDate, setIsDateModalOpen }) {

    const [startDate, setStartDate] = useState(new Date(checkin))
    const [endDate, setEndDate] = useState(new Date(checkout))

    function handleSelect(dates) {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
        setCheckinDate(dayjs(start).format('YYYY-MM-DD'))
        setCheckoutDate(dayjs(end).format('YYYY-MM-DD'))
    }

    return (
        <>
            <button className="odm-btn-booking-dates">
                <div className="odm-booking-dates">
                    <div className="odm-booking-date">
                        <span className="odm-check">CHECK-IN</span>
                        <input
                            className="odm-date"
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value={dayjs(startDate).format('DD/MM/YYYY')}
                            readOnly
                        />
                    </div>
                    <div className="odm-booking-date">
                        <span className="odm-check">CHECK-OUT</span>
                        <input
                            className="odm-date"
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value={dayjs(endDate).format('DD/MM/YYYY')}
                            readOnly
                        />
                    </div>
                </div>
            </button>
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
                    highlightDates={[{ "react-datepicker__day--selected": [startDate, endDate] }]}
                />
            </div>
            <button className="odm-close" onClick={() => setIsDateModalOpen(false)}>Close</button>
        </>
    )
}


                    
