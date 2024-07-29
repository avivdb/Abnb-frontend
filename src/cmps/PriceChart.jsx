import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { loadStays } from '../store/actions/stay.actions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PriceChart = () => {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const labels = stays.map(stay => stay.name);
    const prices = stays.map(stay => stay.price)

    useEffect(() => {
        loadStays(filterBy, 0, false)
    }, [filterBy])

    const data = {
        labels,
        datasets: [
            {
                data: prices,
                backgroundColor: 'rgba(0, 0, 0, 1)',
            },
        ],
    }

    const options = {
        responsive: true,
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    }

    return <Bar data={data} options={options} />;
}

export default PriceChart;
