import React, { useState } from "react";
import CarComparison from "./CarComparison";
import ThemeToggle from "./ThemeToggle";

import logo from "./assets/logo.png";
import volvoFront from "./assets/volvo-v40-front.png";
import volvoSide from "./assets/volvo-v40-side.png";
import bmwFront from "./assets/bmw-3-front.png";
import bmwSide from "./assets/bmw-3-side.png";

import "./App.css";

const cars = [
  {
    id: 1,
    brand: "Volvo",
    model: "V40",
    length_mm: 4369,
    width_mm: 1802,
    height_mm: 1458,
    front_image: volvoFront,
    side_image: volvoSide,
  },
  {
    id: 2,
    brand: "BMW",
    model: "3 Series",
    length_mm: 4709,
    width_mm: 1827,
    height_mm: 1435,
    front_image: bmwFront,
    side_image: bmwSide,
  },
];

export default function App() {
  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);

  return (
    <div className="app">
      <img src={logo} alt="Logo" className="sticky-logo" />
      <ThemeToggle />
      <div className="container">
        <h1 className="title">Araç Boyutları Karşılaştır</h1>
        <div className="selectors">
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
    </div>
  );
}
