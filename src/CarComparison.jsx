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

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-500/10 text-red-400 shadow-[inset_0_0_15px_rgba(239,68,68,0.1)]';
      case 'moderate': return 'border-yellow-500 bg-yellow-500/10 text-yellow-400 shadow-[inset_0_0_15px_rgba(234,179,8,0.1)]';
      case 'minor': return 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-[inset_0_0_15px_rgba(59,130,246,0.1)]';
      default: return 'border-slate-500 bg-slate-500/10 text-slate-400';
    }
  };

  const formatPrice = (price) => price ? new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price) : "Fiyat Bilgisi Yok";

  return (
    <div className="premium-card fade-in h-full flex flex-col justify-start">
      <h2 className="car-title text-3xl font-extrabold text-indigo-400 mb-2 text-center drop-shadow-md tracking-[0.05em]">
        {car.brand} {car.model}
      </h2>
      <div className="text-center text-slate-300 text-lg font-black mb-8 bg-slate-800/80 inline-block mx-auto px-6 py-2 rounded-full border border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
        {car.year} | <span className="text-slate-400">{car.trim}</span>
      </div>

      <div className="specs-container bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 mb-8 shadow-inner">
        <h4 className="text-xs uppercase text-blue-300 font-black tracking-[0.2em] mb-4 border-b border-blue-900/50 pb-3">Gerçek Ölçekler</h4>
        <div className={`spec-row ${getHighlightClass(car.dimensions.length_mm, opponent.dimensions.length_mm)}`}>
          <span className="spec-name opacity-80 text-sm">Uzunluk</span><span className="spec-value text-lg font-black">{car.dimensions.length_mm} mm</span>
        </div>
        <div className={`spec-row ${getHighlightClass(car.dimensions.width_technical_mm, opponent.dimensions.width_technical_mm)}`}>
          <span className="spec-name opacity-80 text-sm">Genişlik (Aynalar Kapalı)</span><span className="spec-value text-lg font-black">{car.dimensions.width_technical_mm} mm</span>
        </div>
        <div className={`spec-row ${getHighlightClass(car.dimensions.width_mirrors_mm, opponent.dimensions.width_mirrors_mm)}`}>
          <span className="spec-name opacity-80 text-sm text-cyan-200">Gerçek Genişlik (Aynalar)</span><span className="spec-value text-lg font-black text-cyan-100">{car.dimensions.width_mirrors_mm} mm</span>
        </div>
        <div className={`spec-row ${getHighlightClass(car.dimensions.wheelbase_mm, opponent.dimensions.wheelbase_mm)}`}>
          <span className="spec-name opacity-80 text-sm font-bold text-indigo-300">Aks Mesafesi</span><span className="spec-value text-lg font-black text-indigo-200">{car.dimensions.wheelbase_mm} mm</span>
        </div>
      </div>

      <div className="specs-container bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 mb-8 shadow-inner">
        <h4 className="text-xs uppercase text-emerald-400 font-black tracking-[0.2em] mb-4 border-b border-emerald-900/50 pb-3">Piyasa & Ünite</h4>
        <div className="spec-row info-row bg-slate-900/50">
          <span className="spec-name opacity-80 text-sm">Şasi & Motor</span><span className="spec-value text-indigo-300 font-bold">{car.engine.type}</span>
        </div>
        <div className={`spec-row ${getHighlightClass(car.engine.horsepower, opponent.engine.horsepower)}`}>
          <span className="spec-name opacity-80 text-sm">Beygir Gücü</span><span className="spec-value text-indigo-300 text-lg font-black">{car.engine.horsepower} HP</span>
        </div>
        <div className="spec-row info-row bg-slate-900/50 border-emerald-500/20 mt-3 p-4 rounded-xl">
          <span className="spec-name opacity-80 text-[11px] uppercase tracking-widest text-emerald-500 font-bold">Gerçek Zamanlı 2. El Değeri</span>
          <span className="spec-value text-emerald-400 font-black text-xl">{formatPrice(car.market_value.second_hand_avg)}</span>
        </div>
      </div>

      {car.reliability && (
        <div className="guide-section mt-auto bg-slate-950/60 border border-slate-700/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
           {/* Reliability Glow Effect */}
           <div className={`absolute top-0 left-0 w-full h-2 ${car.reliability.score_out_of_10 >= 8 ? 'bg-emerald-500' : car.reliability.score_out_of_10 >= 6 ? 'bg-amber-500' : 'bg-red-500'} opacity-80 shadow-[0_0_20px_inherit]`}></div>
           
           <div className="flex justify-between items-center mb-6 pt-2 border-b border-slate-700/50 pb-4">
             <h4 className="text-slate-300 font-black uppercase tracking-[0.2em] text-xs">Arıza & Maliyet Skoru</h4>
             <span className={`text-4xl font-black drop-shadow-md ${car.reliability.score_out_of_10 >= 8 ? 'text-emerald-400' : car.reliability.score_out_of_10 >= 6 ? 'text-amber-400' : 'text-red-500'}`}>
               {car.reliability.score_out_of_10}<span className="text-lg text-slate-600">/10</span>
             </span>
           </div>
           
           <div className="flex flex-col gap-4">
             {car.reliability.chronic_issues.map((issue, idx) => (
                <div key={idx} className={`border-l-4 p-4 rounded-r-xl backdrop-blur-md transition-all hover:scale-[1.02] ${getSeverityStyle(issue.severity)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs font-black leading-tight uppercase tracking-widest">{issue.title}</p>
                    <span className="text-[8px] uppercase tracking-[0.2em] bg-black/50 px-3 py-1 rounded-full font-black opacity-90 shadow-inner">{issue.severity}</span>
                  </div>
                  <p className="text-[12px] opacity-90 leading-relaxed font-medium mt-2">{issue.description}</p>
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
      <div className="text-center p-16 md:p-24 bg-slate-900/40 border border-slate-600/30 outline-dashed outline-2 outline-offset-8 outline-indigo-500/20 rounded-[40px] max-w-4xl mx-auto backdrop-blur-2xl fade-in shadow-[0_0_100px_rgba(0,0,0,0.5)] mt-12 md:mt-20">
        <div className="text-7xl mb-8 mix-blend-screen opacity-20 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">🔬</div>
        <p className="text-xl md:text-3xl text-slate-200 font-black tracking-[0.2em] uppercase leading-tight">Derin Analiz Bekleniyor</p>
        <p className="text-slate-500 mt-6 text-sm font-bold tracking-widest uppercase">X-Ray simülasyonu için üst taraftan konfigürasyon yapınız.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col fade-in">
      <CarSimulator car1={car1} car2={car2} />
      
      <div className="comparison-container flex flex-col xl:flex-row justify-center items-stretch gap-8 lg:gap-16 relative mt-6 px-0">
        <div className="w-full xl:w-1/2 flex">
           <CarCard car={car1} opponent={car2} />
        </div>
        
        {/* VS Badge */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-slate-950 rounded-full flex items-center justify-center text-white font-black text-3xl shadow-[0_0_50px_rgba(99,102,241,0.6)] z-20 border-[4px] border-indigo-500/50 hidden xl:flex backdrop-blur-xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-cyan-400">VS</span>
        </div>

        <div className="w-full xl:w-1/2 flex">
           <CarCard car={car2} opponent={car1} />
        </div>
      </div>
    </div>
  );
};

export default CarComparison;
