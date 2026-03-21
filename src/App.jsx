import React, { useState } from "react";
import CarComparison from "./CarComparison";
import ThemeToggle from "./ThemeToggle";
import CarSelector from "./CarSelector"; // Yeni Hiyerarşik Konfigüratör
import logo from "./assets/logo.png";
import "./App.css";

export default function App() {
  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);

  const handleReset = () => {
    setCar1(null);
    setCar2(null);
  };

  return (
    <div className="app min-h-screen">
      <img src={logo} alt="Logo" className="sticky-logo" />
      <ThemeToggle />
      <div className="container mx-auto px-4 md:px-8 py-10 transition-all">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-emerald-400 mb-16 drop-shadow-xl tracking-tight leading-tight">
          Araba Alım Rehberi
        </h1>

        <div className="flex flex-col xl:flex-row gap-10 mb-16">
          {/* Sol Kolon - Araç 1 */}
          <div className="w-full xl:w-1/2 flex flex-col">
             <CarSelector onSelectCar={setCar1} />
          </div>
          
          {/* Sağ Kolon - Araç 2 */}
          <div className="w-full xl:w-1/2 flex flex-col">
             <CarSelector onSelectCar={setCar2} />
          </div>
        </div>

        {/* Reset Butonu */}
        {(car1 || car2) && (
          <div className="flex justify-center mb-16">
            <button 
              className="px-10 py-4 bg-slate-800 hover:bg-red-600 border border-slate-600 hover:border-red-400 text-white rounded-2xl transition-all duration-300 font-black tracking-widest shadow-2xl hover:shadow-red-500/30 uppercase text-sm" 
              onClick={handleReset}
            >
              Tüm Seçimleri Temizle
            </button>
          </div>
        )}

        <CarComparison car1={car1} car2={car2} />
      </div>
    </div>
  );
}
