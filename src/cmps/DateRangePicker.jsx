// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import '../assets/styles/cmps/DateRangePicker.scss'; // Import your custom CSS file
// import dayjs from 'dayjs';

// export default function DateRangePicker() {
//     const [startDate, setStartDate] = useState(dayjs().toDate());
//     const [endDate, setEndDate] = useState(dayjs().add(7, 'day').toDate());

//     return (
//         <div className="date-range-wrapper">
//             <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 startDate={startDate}
//                 endDate={endDate}
//                 selectsStart
//                 minDate={dayjs().toDate()}
//                 monthsShown={2}
//                 inline
//             />
//             <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 startDate={startDate}
//                 endDate={endDate}
//                 selectsEnd
//                 minDate={startDate}
//                 inline
//             />
//         </div>
//     );
// }

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/styles/cmps/DateRangePicker.scss'; // Import your custom CSS file
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

