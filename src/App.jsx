import React, { useState } from "react";
import volvoV40 from "./assets/volvo-v40.png";
import CarComparison from "./CarComparison";

const cars = [
  {
    id: 1,
    brand: "Volvo",
    model: "V40",
    length_mm: 4369,
    image_url: volvoV40,
  },
  {
    id: 3,
    brand: "BMW",
    model: "3 Series",
    length_mm: 4709,
    image_url: "https://www.carsized.com/img/bmw-3-series-2019.png",
  },
];

export default function App() {
  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);

  return (
    <div style={{ padding: 32, fontFamily: "sans-serif" }}>
      <h1>Araba Boyutu Karşılaştır</h1>
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <select onChange={(e) => setCar1(JSON.parse(e.target.value))}>
          <option>Araba 1 Seçin</option>
          {cars.map((car) => (
            <option key={car.id} value={JSON.stringify(car)}>
              {car.brand} {car.model}
            </option>
          ))}
        </select>
        <select onChange={(e) => setCar2(JSON.parse(e.target.value))}>
          <option>Araba 2 Seçin</option>
          {cars.map((car) => (
            <option key={car.id} value={JSON.stringify(car)}>
              {car.brand} {car.model}
            </option>
          ))}
        </select>
      </div>

      <CarComparison car1={car1} car2={car2} />
    </div>
  );
}
