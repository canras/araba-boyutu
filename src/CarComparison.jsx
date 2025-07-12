import React, { useRef, useEffect, useState } from "react";
import "./App.css";

const SCALE_WIDTH = 0.35;
const SCALE_LENGTH = 0.18;

const CarComparison = ({ car1, car2 }) => {
  const [heights, setHeights] = useState([null, null]);

  const refs = [useRef(null), useRef(null)];

  useEffect(() => {
    const newHeights = refs.map(ref => ref.current?.clientHeight || 0);
    setHeights(newHeights);
  }, [car1, car2]);

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
            <div
              className="height-bar"
              style={{ height: heights[index] }}
            >
              <span>{car.height_mm} mm</span>
            </div>
            <div>
              <img
                ref={refs[index]}
                src={car.side_image}
                alt="side"
                style={{
                  width: car.length_mm * SCALE_LENGTH,
                  height: "auto",
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
