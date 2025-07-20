import React, { useRef, useState } from "react";
import "./App.css";

const SCALE_WIDTH = 0.35;
const SCALE_LENGTH = 0.18;

const CarComparison = ({ car1, car2 }) => {
  const [heights, setHeights] = useState([null, null]);
  const imageRefs = [useRef(null), useRef(null)];

  const handleImageLoad = (index) => {
    const img = imageRefs[index].current;
    if (img) {
      const updated = [...heights];
      updated[index] = img.clientHeight;
      setHeights(updated);
    }
  };

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
        {[car1, car2].map((car, index) => (
          <div className="side-container fade-in" key={car.id}>
            <div className="side-image-wrapper">
              <div
                className="height-bar"
                style={{
                  height: heights[index] || 0,
                }}
              >
                <span>{car.height_mm} mm</span>
              </div>
              <img
                ref={imageRefs[index]}
                src={car.side_image}
                alt="side"
                onLoad={() => handleImageLoad(index)}
                style={{
                  width: car.length_mm * SCALE_LENGTH,
                  height: "auto",
                  display: "block",
                }}
              />
              <div
                className="ruler"
                style={{ width: car.length_mm * SCALE_LENGTH }}
              >
                {car.length_mm} mm
              </div>
            </div>
            <div className="label">{car.brand} {car.model}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarComparison;
