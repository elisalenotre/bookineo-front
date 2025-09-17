import React, { useState } from "react";

export default function PriceSelector() {
    const [minPrice, setMinPrice] = useState(2500);
    const [maxPrice, setMaxPrice] = useState(8500);

    const handleMinPriceChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice - 1);
        setMinPrice(value);
    };

    const handleMaxPriceChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice + 1);
        setMaxPrice(value);
    };

    return (
        <div>
            <div className="price-input-container">
                <div className="price-input">
                    <div className="price-field">
                        <span>Prix minimum</span>
                        <input
                            type="number"
                            className="input min-input"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                        />
                    <input
                        type="range"
                        className="input min-range"
                        min="0"
                        max="20"
                        value={minPrice}
                        step="1"
                        onChange={handleMinPriceChange}
                    />
                    </div>
                    <div className="price-field">
                        <span>Prix maximum</span>
                        <input
                            type="number"
                            className="input max-input"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                        />
                        <input
                            className="input max-range"
                            type="range"
                            min="0"
                            max="100"
                            value={maxPrice}
                            step="1"
                            onChange={handleMaxPriceChange}
                        />  
                    </div>
                </div>
                <div className="slider">
                    <div
                        className="price-slider"
                        style={{
                            left: `${(minPrice / 10000) * 100}%`,
                            right: `${100 - (maxPrice / 10000) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>

        </div>
    );
}