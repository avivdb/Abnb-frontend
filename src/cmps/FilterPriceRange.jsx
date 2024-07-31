import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export function FilterPriceRange({ minPrice, maxPrice, setMinPrice, setMaxPrice }) {

    const handleSliderChange = (value) => {
        setMinPrice(value[0]);
        setMaxPrice(value[1]);
    };

    return (
        <div className="filter-price-range">

            <Slider
                range
                min={40}
                max={3500}
                defaultValue={[40, 3500]}
                onChange={handleSliderChange}
                trackStyle={[{ backgroundColor: 'black' }]}
                handleStyle={[{ backgroundColor: 'white', borderColor: 'black' }]}
            />
            <div className="price-inputs">

                <div className="price-input">
                    <label>Minimum</label>
                    <input
                        type="text"
                        value={`₪ ${minPrice}`}
                        readOnly
                    />
                </div>
                <p className='fa solid minus'></p>
                <div className="price-input">
                    <label>Maximum</label>
                    <input
                        type="text"
                        value={`₪ ${maxPrice}+`}
                        readOnly
                    />
                </div>

            </div>
        </div>
    );
}
