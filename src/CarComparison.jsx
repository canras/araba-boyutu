import React from "react";

const SCALE = 0.1; // 1mm = 0.1px

const CarComparison = ({ car1, car2 }) => {
  if (!car1 || !car2) return <p>Lütfen iki araba seçin.</p>;

  const maxLength = Math.max(car1.length_mm, car2.length_mm);
  const imageHeight = 100;

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Boyut Karşılaştırması</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          gap: 40,
          marginBottom: 24,
        }}
      >
        {[car1, car2].map((car, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              width: car.length_mm * SCALE,
              transition: "all 0.3s ease",
            }}
          >
            <img
              src={car.image_url}
              alt={car.model}
              style={{
                width: "100%",
                height: imageHeight,
                objectFit: "contain",
              }}
            />
            <div>{car.brand} {car.model}</div>
            <small>{car.length_mm} mm</small>
          </div>
        ))}
      </div>

      {/* Cetvel */}
      <div
        style={{
          position: "relative",
          height: 20,
          borderTop: "1px solid black",
          width: maxLength * SCALE,
          margin: "0 auto"
        }}
      >
        {Array.from({ length: Math.ceil(maxLength / 500) + 1 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${i * 500 * SCALE}px`,
              height: i % 2 === 0 ? 14 : 8,
              borderLeft: "1px solid black",
              fontSize: 10,
              color: "#333",
            }}
          >
            <div style={{ position: "absolute", top: 14 }}>
              {i * 500} mm
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarComparison;
