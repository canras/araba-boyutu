import React, { useState } from 'react';

const cars = [
  {
    id: 1,
    brand: "Volvo",
    model: "V40",
    length_mm: 4369,
    width_mm: 1802,
    height_mm: 1458,
    image_url: "https://www.carsized.com/img/volvo-v40-2012.png"
  },
  {
    id: 2,
    brand: "Audi",
    model: "A3 Sedan",
    length_mm: 4495,
    width_mm: 1816,
    height_mm: 1425,
    image_url: "https://www.carsized.com/img/audi-a3-sedan-2021.png"
  }
];

export default function App() {
  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Araba Boyutu Karşılaştırma</h1>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <select onChange={(e) => setCar1(JSON.parse(e.target.value))}>
          <option>Araba 1 Seçin</option>
          {cars.map(car => (
            <option key={car.id} value={JSON.stringify(car)}>
              {car.brand} {car.model}
            </option>
          ))}
        </select>
        <select onChange={(e) => setCar2(JSON.parse(e.target.value))}>
          <option>Araba 2 Seçin</option>
          {cars.map(car => (
            <option key={car.id} value={JSON.stringify(car)}>
              {car.brand} {car.model}
            </option>
          ))}
        </select>
      </div>

      {car1 && car2 && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[car1, car2].map((car, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <img src={car.image_url} alt={car.model} style={{ maxHeight: 150 }} />
              <h3>{car.brand} {car.model}</h3>
              <p>Uzunluk: {car.length_mm} mm</p>
              <p>Genişlik: {car.width_mm} mm</p>
              <p>Yükseklik: {car.height_mm} mm</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
