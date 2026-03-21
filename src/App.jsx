import React, { useState, useEffect } from "react";
import CarComparison from "./CarComparison";
import ThemeToggle from "./ThemeToggle";
import CarSelector from "./CarSelector"; 
import logo from "./assets/logo.png";
import "./App.css";

export default function App() {
  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);

  useEffect(() => {
    if (car1 && car2) {
      document.title = `${car1.brand} ${car1.model} vs ${car2.brand} ${car2.model} | Boyut & Kronik Sorunlar`;
    } else {
      document.title = "Araba Alım Rehberi | V2 Pro Konfigüratör";
    }
  }, [car1, car2]);

  const handleReset = () => {
    setCar1(null);
    setCar2(null);
  };

  return (
    <div className="app min-h-screen bg-slate-950">
      <img src={logo} alt="Logo" className="sticky-logo z-[110] hidden md:block" />
      <ThemeToggle />
      
      {/* Mobil İçin Sticky Header (Pro Görünüm) */}
      {car1 && car2 && (
        <div className="md:hidden sticky top-0 z-[100] bg-slate-950/80 backdrop-blur-xl border-b border-indigo-900/50 p-4 transition-all flex justify-between items-center shadow-2xl">
           <div className="flex flex-col gap-1">
             <span className="text-cyan-400 font-black text-[10px] tracking-[0.2em] uppercase">{car1.brand} {car1.model}</span>
             <span className="text-orange-500 font-black text-[10px] tracking-[0.2em] uppercase">{car2.brand} {car2.model}</span>
           </div>
           <button onClick={handleReset} className="bg-rose-500/20 text-rose-300 px-4 py-2 rounded-xl text-xs font-black tracking-widest uppercase border border-rose-500/30">Başa Dön</button>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 transition-all">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-center text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-cyan-400 mb-12 lg:mb-20 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)] tracking-[0.05em] leading-tight">
          Araba Alım Rehberi <span className="text-sm align-super text-indigo-300/50">PRO</span>
        </h1>

        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 mb-16">
          <div className="w-full xl:w-1/2 flex flex-col">
             <CarSelector onSelectCar={setCar1} />
          </div>
          <div className="w-full xl:w-1/2 flex flex-col">
             <CarSelector onSelectCar={setCar2} />
          </div>
        </div>

        {/* Masaüstü Reset */}
        {(car1 || car2) && (
          <div className="hidden md:flex justify-center mb-16">
            <button 
              className="px-12 py-5 bg-slate-900/80 hover:bg-rose-900/80 border border-slate-700 hover:border-rose-500 text-white rounded-3xl transition-all duration-300 font-black tracking-[0.2em] shadow-[0_0_30px_rgba(225,29,72,0.15)] hover:shadow-[0_0_50px_rgba(225,29,72,0.5)] uppercase text-sm backdrop-blur-md" 
              onClick={handleReset}
            >
              Simülasyonu Sıfırla
            </button>
          </div>
        )}

        <CarComparison car1={car1} car2={car2} />
      </div>
    </div>
  );
}
