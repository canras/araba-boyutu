import React, { useState, useMemo } from 'react';
import carData from './data/premiumCars.json';

export default function CarSelector({ onSelectCar }) {
  // --- 1. State Yönetimi ---
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedSpecId, setSelectedSpecId] = useState("");

  // --- 2. Hiyerarşik Veri Tüketimi (Tetikleme) ---
  const brands = Object.keys(carData.brands);
  
  // Marka seçildiğinde modelleri filtrele
  const models = useMemo(() => {
    if (!selectedBrand) return [];
    return Object.keys(carData.brands[selectedBrand].models);
  }, [selectedBrand]);

  // Model seçildiğinde donanımları (Specs) filtrele
  const specs = useMemo(() => {
    if (!selectedBrand || !selectedModel) return [];
    return carData.brands[selectedBrand].models[selectedModel].specs;
  }, [selectedBrand, selectedModel]);

  // --- 3. Event Handler'lar (Aşağı Yönlü Resetleme Mantığı) ---
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedModel(""); // Alt kırılımları sıfırla
    setSelectedSpecId("");
    onSelectCar(null);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
    setSelectedSpecId(""); // Alt kırılımı sıfırla
    onSelectCar(null);
  };

  const handleSpecChange = (e) => {
    const specId = e.target.value;
    setSelectedSpecId(specId);
    if (specId) {
      const fullCarData = specs.find(s => s.id === specId);
      // Tüm objeyi birleştirip ana sayfa state'ine (App.jsx) gönderiyoruz
      onSelectCar({ brand: selectedBrand, model: selectedModel, ...fullCarData });
    } else {
      onSelectCar(null);
    }
  };

  // --- 4. Premium UI/UX (Tailwind "Selection Hero" Alanı) ---
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl transition-all duration-300">
      <h3 className="text-xl md:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 mb-6 uppercase">
        Konfigüratör: Araç Seçimi
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Marka */}
        <div className="flex flex-col gap-2 relative group">
          <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold ml-1">1. Marka</label>
          <select 
            value={selectedBrand} 
            onChange={handleBrandChange}
            className="w-full appearance-none bg-slate-800/80 border border-slate-700 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all cursor-pointer hover:bg-slate-700 font-medium tracking-wide shadow-inner"
          >
            <option value="">Marka Seçin...</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          {/* Lüks Custom Arrow (Chevron) */}
          <div className="absolute right-4 top-[44px] pointer-events-none text-gray-500 group-hover:text-blue-400 transition-colors text-xs">▼</div>
        </div>

        {/* 2. Model (Pasifse saydamlaşır) */}
        <div className={`flex flex-col gap-2 relative group transition-all duration-300 ${!selectedBrand ? 'opacity-30 pointer-events-none grayscale' : 'opacity-100'}`}>
          <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold ml-1">2. Model</label>
          <select 
            value={selectedModel} 
            onChange={handleModelChange}
            disabled={!selectedBrand}
            className="w-full appearance-none bg-slate-800/80 border border-slate-700 text-white px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all cursor-pointer hover:bg-slate-700 font-medium tracking-wide shadow-inner"
          >
            <option value="">Model Seçin...</option>
            {models.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <div className="absolute right-4 top-[44px] pointer-events-none text-gray-500 group-hover:text-blue-400 transition-colors text-xs">▼</div>
        </div>

        {/* 3. Yıl / Donanım (Spec) */}
        <div className={`flex flex-col gap-2 relative group transition-all duration-300 ${!selectedModel ? 'opacity-30 pointer-events-none grayscale' : 'opacity-100'}`}>
          <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold ml-1">3. Yıl / Donanım</label>
          <select 
            value={selectedSpecId} 
            onChange={handleSpecChange}
            disabled={!selectedModel}
            className="w-full appearance-none bg-blue-900/20 border border-blue-800/50 text-blue-50 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all cursor-pointer hover:bg-blue-800/40 font-bold tracking-wide shadow-lg shadow-blue-900/20"
          >
            <option value="">Versiyon Seçin...</option>
            {specs.map(s => <option key={s.id} value={s.id}>{s.year} - {s.trim}</option>)}
          </select>
          <div className="absolute right-4 top-[44px] pointer-events-none text-gray-500 group-hover:text-blue-400 transition-colors text-xs">▼</div>
        </div>

      </div>
    </div>
  );
}
