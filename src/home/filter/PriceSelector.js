import React from 'react';

const PriceSelector = ({
  dataMinPrice,
  dataMaxPrice,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) => {
  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 0.01);
    onMinPriceChange(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 0.01);
    onMaxPriceChange(value);
  };

  return (
    <div>
      <div className="price-input-container">
        <div className="price-input box">
          <h3>Choisissez une fourchette de prix :</h3>

          <div className="price-fields">
            <div className="price-field">
              <span>Prix minimum</span>
              <input
                type="number"
                className="input min-input"
                value={minPrice}
                min={dataMinPrice}
                max={maxPrice - 0.01}
                onChange={handleMinPriceChange}
              />
              <input
                type="range"
                className="input min-range"
                min={dataMinPrice}
                max={dataMaxPrice}
                value={minPrice}
                step="0.01"
                onChange={handleMinPriceChange}
              />
            </div>
            <div className="price-field">
              <span>Prix maximum</span>
              <input
                type="number"
                className="input max-input"
                value={maxPrice}
                min={minPrice + 0.01}
                max={dataMaxPrice}
                onChange={handleMaxPriceChange}
              />
              <input
                type="range"
                className="input max-range"
                min={dataMinPrice}
                max={dataMaxPrice}
                value={maxPrice}
                step="0.01"
                onChange={handleMaxPriceChange}
              />
            </div>
          </div>

          <div className="slider">
            <div
              className="price-slider"
              style={{
                left: `${((minPrice - dataMinPrice) / (dataMaxPrice - dataMinPrice)) * 100}%`,
                right: `${100 - ((maxPrice - dataMinPrice) / (dataMaxPrice - dataMinPrice)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PriceSelector;