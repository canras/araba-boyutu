import React from "react";
import "./App.css";
import CarSimulator from "./CarSimulator";

const CarCard = ({ car, opponent }) => {
  if (!opponent) return null;

  const getHighlightClass = (val1, val2, inverse = false) => {
    if (val1 === val2) return "tie";
    if (!inverse) {
      return val1 > val2 ? "win" : "lose";
    } else {
      return val1 < val2 ? "win" : "lose";
    }
  };

  const formatPrice = (price) => price ? new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price) : "Fiyat Bilgisi Yok";

  return (
    <div className="premium-card fade-in h-full flex flex-col justify-start">
      <h2 className="car-title text-3xl font-extrabold text-blue-400 mb-2 text-center drop-shadow-md">
        {car.brand} {car.model}
      </h2>
      <div className="text-center text-slate-300 text-lg font-medium mb-8 bg-slate-800/50 inline-block mx-auto px-4 py-1 rounded-full border border-white/5">
        {car.year} | {car.trim}
      </div>

      <div className="visuals flex flex-col gap-4 mb-8 relative">
        <div className="visual-box relative bg-slate-800/30 border border-white/5 rounded-2xl p-6 h-[200px] flex items-center justify-center group overflow-hidden">
          {car.images?.side_transparent ? 
            <img src={car.images.side_transparent} alt="side view" className="object-contain max-h-full group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]" /> :
            <div className="text-gray-500 italic flex items-center justify-center w-full h-full">Görsel Yok</div>
          }
        </div>
      </div>

      <div className="specs-container bg-slate-800/40 rounded-xl p-5 border border-slate-700/50 mb-6 shadow-inner">
        <h4 className="text-xs uppercase text-blue-300 font-black tracking-[0.2em] mb-4 border-b border-blue-900/50 pb-2">Ölçüler (Milimetre)</h4>
        <div className={`spec-row ${getHighlightClass(car.dimensions.length_mm, opponent.dimensions.length_mm)}`}>
          <span className="spec-name opacity-80 text-sm">Uzunluk</span><span className="spec-value text-lg">{car.dimensions.length_mm}</span>
        </div>
        <div className={`spec-row ${getHighlightClass(car.dimensions.width_mm, opponent.dimensions.width_mm)}`}>
          <span className="spec-name opacity-80 text-sm">Genişlik</span><span className="spec-value text-lg">{car.dimensions.width_mm}</span>
        </div>
        <div className={`spec-row ${getHighlightClass(car.dimensions.height_mm, opponent.dimensions.height_mm)}`}>
          <span className="spec-name opacity-80 text-sm">Yükseklik</span><span className="spec-value text-lg">{car.dimensions.height_mm}</span>
        </div>
        <div className={`spec-row ${getHighlightClass(car.dimensions.wheelbase_mm, opponent.dimensions.wheelbase_mm)}`}>
          <span className="spec-name opacity-80 text-sm font-bold text-blue-200">Aks Mesafesi</span><span className="spec-value text-lg text-blue-100">{car.dimensions.wheelbase_mm}</span>
        </div>
      </div>

      <div className="specs-container bg-slate-800/40 rounded-xl p-5 border border-slate-700/50 mb-6 shadow-inner">
        <h4 className="text-xs uppercase text-emerald-400 font-black tracking-[0.2em] mb-4 border-b border-emerald-900/50 pb-2">Performans & Fiyat</h4>
        <div className="spec-row info-row bg-slate-900/50">
          <span className="spec-name opacity-80 text-sm">Motor</span><span className="spec-value text-blue-300">{car.engine.type}</span>
        </div>
        <div className={`spec-row ${getHighlightClass(car.engine.horsepower, opponent.engine.horsepower)}`}>
          <span className="spec-name opacity-80 text-sm">Beygir Gücü</span><span className="spec-value text-blue-300 text-lg">{car.engine.horsepower} HP</span>
        </div>
        <div className="spec-row info-row bg-slate-900/50 border-emerald-500/20 mt-2">
          <span className="spec-name opacity-80 text-sm">Ortalama 2. El Değeri</span>
          <span className="spec-value text-emerald-400 font-black text-xl">{formatPrice(car.market_value.second_hand_avg)}</span>
        </div>
      </div>

      {car.chronic_issues && car.chronic_issues.length > 0 && (
        <div className="guide-section mt-auto bg-red-950/20 border border-red-500/30 rounded-xl p-6 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
           <h4 className="text-red-400 font-black mb-5 uppercase tracking-[0.1em] text-sm flex items-center gap-3">
             <span className="text-xl">⚠️</span> Sorunlar & Şikayetler
           </h4>
           <div className="flex flex-col gap-5">
             {car.chronic_issues.map((issue, idx) => (
                <div key={idx} className="border-l-4 border-red-500/70 bg-black/20 p-4 rounded-r-lg">
                  <p className="text-sm font-bold text-red-200 mb-2 leading-tight uppercase tracking-wide">{issue.title}</p>
                  <p className="text-[13px] text-red-100/70 leading-relaxed font-medium">{issue.description}</p>
                </div>
             ))}
           </div>
        </div>
      )}
    </div>
  );
};

const CarComparison = ({ car1, car2 }) => {
  if (!car1 || !car2) {
    return (
      <div className="text-center p-16 bg-slate-800/40 border border-slate-600/50 outline-dashed outline-2 outline-offset-8 outline-slate-700 rounded-3xl max-w-4xl mx-auto backdrop-blur-xl fade-in shadow-2xl">
        <div className="text-5xl mb-6 opacity-30">⚖️</div>
        <p className="text-2xl text-slate-300 font-semibold tracking-wide">Analiz başlatmak için yukarıdan iki farklı aracı konfigüre edin.</p>
        <p className="text-slate-500 mt-4 text-sm font-medium">Marka &gt; Model &gt; Donanım seçimi yapılması gerekmektedir.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col fade-in">
      <CarSimulator car1={car1} car2={car2} />
      
      <div className="comparison-container flex flex-col xl:flex-row justify-center items-stretch gap-12 relative mt-4 px-4">
        <div className="w-full xl:w-1/2 flex">
           <CarCard car={car1} opponent={car2} />
        </div>
        
        {/* VS Badge */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-800 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-[0_0_40px_rgba(59,130,246,0.8)] z-20 border-4 border-slate-900 ring-2 ring-white/10 hidden xl:flex">
          VS
        </div>

        <div className="w-full xl:w-1/2 flex">
           <CarCard car={car2} opponent={car1} />
        </div>
      </div>
    </div>
  );
};

export default CarComparison;
