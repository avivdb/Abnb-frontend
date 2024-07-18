import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import DateFnsAdapter from '@date-io/date-fns'; // Ensure this is the correct import

export function MyDateRangePicker() {
    const [value, setValue] = useState([null, null]);

    return (
        <LocalizationProvider dateAdapter={DateFnsAdapter}>
            <DateRangePicker
                startText="Check-in"
                endText="Check-out"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <TextField
                            {...startProps}
                            variant="outlined"
                            sx={{
                                width: '50%',
                                borderRadius: '10px 0 0 10px',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '10px 0 0 10px',
                                }
                            }}
                        />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField
                            {...endProps}
                            variant="outlined"
                            sx={{
                                width: '50%',
                                borderRadius: '0 10px 10px 0',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '0 10px 10px 0',
                                }
                            }}
                        />
                    </Box>
                )}
            />
        </LocalizationProvider>
    );
}
