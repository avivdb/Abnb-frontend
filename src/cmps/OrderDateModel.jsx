import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function parseDate(dateStr) {
    if (!dateStr) return null
    const [day, month, year] = dateStr.split('-').map(Number)
    return new Date(year, month - 1, day)
}

function formatDate(date) {
    if (!date) return ''
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
}

function displayDate(date) {
    if (!date) return ''
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

export function OrderDateModel({ orderToEdit, setOrderToEdit, setIsDateModalOpen }) {
    const [startDate, setStartDate] = useState(() => {
        const parsedDate = parseDate(orderToEdit.startDate)
        return parsedDate instanceof Date && !isNaN(parsedDate) ? parsedDate : null
    })
    const [endDate, setEndDate] = useState(() => {
        const parsedDate = parseDate(orderToEdit.endDate)
        return parsedDate instanceof Date && !isNaN(parsedDate) ? parsedDate : null
    })

    function handleSelect(dates) {
        const [start, end] = dates;
        setStartDate(start)
        setEndDate(end)

        if (start && end) {
            setOrderToEdit({
                ...orderToEdit,
                startDate: formatDate(start),
                endDate: formatDate(end)
            })
        }
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
                            value={displayDate(startDate)}
                            readOnly
                        />
                    </div>
                    <div className="odm-booking-date">
                        <span className="odm-check">CHECK-OUT</span>
                        <input
                            className="odm-date"
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value={displayDate(endDate)}
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
                    minDate={new Date()}
                    inline
                    monthsShown={2}
                    highlightDates={[startDate, endDate].filter(Boolean)}
                />
            </div>
            {setIsDateModalOpen && <button className="odm-close" onClick={() => setIsDateModalOpen(false)}>Close</button>}
        </>
    )
}
