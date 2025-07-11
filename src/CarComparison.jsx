import React from "react";

const SCALE_WIDTH = 0.6;
const SCALE_LENGTH = 0.35;
const SCALE_HEIGHT = 1.5;

const CarComparison = ({ car1, car2 }) => {
  if (!car1 || !car2) return <p>Lütfen iki araba seçin.</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Genişlik Karşılaştırması</h2>
      <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
        {[car1, car2].map((car) => (
          <div key={car.id} style={{ textAlign: "center" }}>
            <img
              src={car.front_image || car.side_image}
              alt={`${car.brand} ${car.model} ön`}
              style={{
                width: car.width_mm * SCALE_WIDTH,
                height: 200,
                objectFit: "contain",
              }}
            />
            <div
              style={{
                position: "relative",
                height: 20,
                width: car.width_mm * SCALE_WIDTH,
                borderTop: "2px solid black",
                marginTop: 8,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  right: 0,
                  fontSize: 12,
                }}
              >
                {car.width_mm} mm
              </span>
            </div>
            <div>
              {car.brand} {car.model}
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 60 }}>Uzunluk ve Yükseklik Karşılaştırması</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 48,
          alignItems: "center",
        }}
      >
        {[car1, car2].map((car) => (
          <div
            key={car.id}
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 16,
              justifyContent: "center",
            }}
          >
            {/* Yükseklik cetveli */}
            <div
              style={{
                height: car.height_mm * SCALE_HEIGHT,
                width: 2,
                backgroundColor: "black",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -20,
                  left: -10,
                  fontSize: 12,
                }}
              >
                {car.height_mm} mm
              </span>
            </div>

            {/* Araç yan görünüm */}
            <div style={{ textAlign: "center" }}>
              <img
                src={car.side_image}
                alt={`${car.brand} ${car.model} yan`}
                style={{
                  width: car.length_mm * SCALE_LENGTH,
                  height: car.height_mm * SCALE_HEIGHT,
                  objectFit: "contain",
                }}
              />
              <div
                style={{
                  position: "relative",
                  height: 20,
                  width: car.length_mm * SCALE_LENGTH,
                  borderTop: "2px solid black",
                  marginTop: 8,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    fontSize: 12,
                  }}
                >
                  {car.length_mm} mm
                </span>
              </div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                {car.brand} {car.model}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarComparison;
