import React from "react";
import "./App.css";

const CarCard = ({ car, opponent }) => {
  // Return early if no opponent somehow
  if (!opponent) return null;

  const getHighlightClass = (val1, val2) => {
    if (val1 > val2) return "win";
    if (val1 < val2) return "lose";
    return "tie";
  };

  return (
    <div className="premium-card fade-in">
      <h2 className="car-title">
        {car.brand} {car.model}
      </h2>

      <div className="visuals">
        <div className="visual-box">
          <img src={car.side_image} alt="side view" />
          <span className="visual-label">Side View</span>
        </div>
        <div className="visual-box">
          <img src={car.front_image} alt="front view" style={{ maxHeight: '100px' }} />
          <span className="visual-label">Front View</span>
        </div>
      </div>

      <div className="specs-container">
        <div className={`spec-row ${getHighlightClass(car.length_mm, opponent.length_mm)}`}>
          <span className="spec-name">Length</span>
          <span className="spec-value">{car.length_mm} mm</span>
        </div>
        <div className={`spec-row ${getHighlightClass(car.width_mm, opponent.width_mm)}`}>
          <span className="spec-name">Width</span>
          <span className="spec-value">{car.width_mm} mm</span>
        </div>
        <div className={`spec-row ${getHighlightClass(car.height_mm, opponent.height_mm)}`}>
          <span className="spec-name">Height</span>
          <span className="spec-value">{car.height_mm} mm</span>
        </div>
      </div>
    </div>
  );
};

const CarComparison = ({ car1, car2 }) => {
  if (!car1 || !car2) {
    return <p className="warning fade-in">Please select two cars from the dropdowns above to compare.</p>;
  }

  return (
    <div className="comparison-container">
      <div className="cards-wrapper">
        <CarCard car={car1} opponent={car2} />
        <div className="vs-badge fade-in">VS</div>
        <CarCard car={car2} opponent={car1} />
      </div>
    </div>
  );
};

export default CarComparison;
