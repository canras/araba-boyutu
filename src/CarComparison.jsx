import React from "react";
import "./App.css";

// Yeni daha kompakt boyutlar:
const SCALE_WIDTH = 0.35;
const SCALE_LENGTH = 0.18;
const SCALE_HEIGHT = 0.75;

const CarComparison = ({ car1, car2 }) => {
  if (!car1 || !car2) return <p className="warning">Lütfen iki araba seçin.</p>;

  return (
    <div className="comparison">
      <h2 className="section-title">Genişlik Karşılaştırması</h2>
      <div className="car-row">
        {[car1, car2].map((car) => (
          <div className="car-box fade-in" key={car.id}>
            <img
              src={car.front_image}
              alt="front"
              style={{ width: car.width_mm * SCALE_WIDTH }}
            />
            <div className="ruler" style={{ width: car.width_mm * SCALE_WIDTH }}>
              {car.width_mm} mm
            </div>
            <div className="label">{car.brand} {car.model}</div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Uzunluk ve Yükseklik Karşılaştırması</h2>
      <div className="car-side-row">
        {[car1, car2].map((car) => (
          <div className="side-container fade-in" key={car.id}>
            <div
              className="height-bar"
              style={{ height: car.height_mm * SCALE_HEIGHT }}
            >
              <span>{car.height_mm} mm</span>
            </div>
            <div>
              <img
                src={car.side_image}
                alt="side"
                style={{
                  width: car.length_mm * SCALE_LENGTH,
                  height: car.height_mm * SCALE_HEIGHT,
                }}
              />
              <div
                className="ruler"
                style={{ width: car.length_mm * SCALE_LENGTH }}
              >
                {car.length_mm} mm
              </div>
              <div className="label">{car.brand} {car.model}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarComparison;
