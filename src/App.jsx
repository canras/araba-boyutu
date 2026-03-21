import React, { useState } from "react";
import CarComparison from "./CarComparison";
import ThemeToggle from "./ThemeToggle";

import logo from "./assets/logo.png";
import volvoFront from "./assets/volvo-v40-front.png";
import volvoSide from "./assets/volvo-v40-side.png";
import bmwFront from "./assets/bmw-3-front.png";
import bmwSide from "./assets/bmw-3-side.png";
// Import new Gemini-generated images
import golfSide from "./assets/golf_8_side_1774093260190.png";
import peugeotSide from "./assets/peugeot_308_side_1774093277554.png";

import "./App.css";

const cars = [
  {
    id: 1,
    brand: "Volvo",
    model: "V40",
    length_mm: 4369,
    width_mm: 1802,
    height_mm: 1458,
    engine: "1.5 T3 / 152 HP",
    horsepower: 152,
    chronic_issues: "EGR valve issues on diesels, infotainment glitches.",
    pros: "Exceptional safety, comfortable seats, premium feel.",
    cons: "Small trunk space, outdated interior tech, stiff ride.",
    front_image: volvoFront,
    side_image: volvoSide,
  },
  {
    id: 2,
    brand: "BMW",
    model: "3 Series (F30)",
    length_mm: 4624,
    width_mm: 1811,
    height_mm: 1429,
    engine: "1.6 320i ED / 170 HP",
    horsepower: 170,
    chronic_issues: "Timing chain rattle (N13 engine), cooling system leaks.",
    pros: "Superb driving dynamics, great ZF 8-speed transmission, sporty.",
    cons: "Expensive maintenance, harsh ride on M-Sport suspension.",
    front_image: bmwFront,
    side_image: bmwSide,
  },
  {
    id: 3,
    brand: "Volkswagen",
    model: "Golf 8",
    length_mm: 4284,
    width_mm: 1789,
    height_mm: 1456,
    engine: "1.5 eTSI / 150 HP",
    horsepower: 150,
    chronic_issues: "DSG mechatronic failures, laggy infotainment system bugs.",
    pros: "Great fuel economy, excellent build quality, very practical.",
    cons: "Annoying touch-sensitive climate controls, expensive options.",
    front_image: null,
    side_image: golfSide,
  },
  {
    id: 4,
    brand: "Peugeot",
    model: "308",
    length_mm: 4367,
    width_mm: 1852,
    height_mm: 1441,
    engine: "1.2 PureTech / 130 HP",
    horsepower: 130,
    chronic_issues: "Timing belt degrading in oil (PureTech engine).",
    pros: "Stunning modern design, i-Cockpit steering feel, comfortable.",
    cons: "Cramped rear seats, confusing infotainment sub-menus.",
    front_image: null,
    side_image: peugeotSide,
  }
];

export default function App() {
  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);

  const handleReset = () => {
    setCar1(null);
    setCar2(null);
  };

  return (
    <div className="app">
      <img src={logo} alt="Logo" className="sticky-logo" />
      <ThemeToggle />
      <div className="container">
        <h1 className="title">Compare</h1>

        <div className="selectors">
          <select
            value={car1 ? JSON.stringify(car1) : "none"}
            onChange={(e) =>
              setCar1(e.target.value === "none" ? null : JSON.parse(e.target.value))
            }
          >
            <option value="none">Select Car 1</option>
            {cars.map((car) => (
              <option key={car.id} value={JSON.stringify(car)}>
                {car.brand} {car.model}
              </option>
            ))}
          </select>

          <select
            value={car2 ? JSON.stringify(car2) : "none"}
            onChange={(e) =>
              setCar2(e.target.value === "none" ? null : JSON.parse(e.target.value))
            }
          >
            <option value="none">Select Car 2</option>
            {cars.map((car) => (
              <option key={car.id} value={JSON.stringify(car)}>
                {car.brand} {car.model}
              </option>
            ))}
          </select>

          <button className="clear-button" onClick={handleReset}>
            Clear
          </button>
        </div>

        <CarComparison car1={car1} car2={car2} />
      </div>
    </div>
  );
}
