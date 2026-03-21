import React from 'react';

export default function CarSimulator({ car1, car2 }) {
  if (!car1 || !car2) return null;

  // 1. Ölçekleme Mantığı (Matematiksel Formül)
  const maxLength = Math.max(car1.dimensions.length_mm, car2.dimensions.length_mm);
  
  // Yüzdesel genişlikleri hesapla. %90 kullanıyoruz ki sağda boşluk kalsın.
  const getSimulatedWidth = (length) => `${(length / maxLength) * 85}%`; 

  return (
    <div className="w-full bg-slate-900 border border-slate-700/50 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden mb-12 relative fade-in">
      <h3 className="text-xl md:text-2xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400 mb-8 tracking-[0.2em] uppercase">
        X-Ray Boyut Simülatörü
      </h3>

      {/* Blueprint Alanı */}
      <div className="relative w-full h-[250px] md:h-[400px] bg-slate-950 rounded-2xl border border-blue-900/40 flex items-end justify-start overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* Karolu Grid Arkaplanı (Blueprint Efekti) */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        {/* Zemin Çizgisi */}
        <div className="absolute bottom-[40px] w-full border-b-2 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-0"></div>

        {/* Araç 1 (Mavi / Cyan X-Ray) */}
        {car1.images?.side_transparent && (
          <div 
            className="absolute bottom-[40px] left-[5%] transition-all duration-700 ease-in-out z-20"
            style={{ width: getSimulatedWidth(car1.dimensions.length_mm) }}
          >
            <img 
              src={car1.images.side_transparent} 
              alt={car1.model} 
              className="w-full h-auto object-contain mix-blend-screen opacity-90 drop-shadow-[0_0_20px_rgba(34,211,238,0.7)]"
              style={{ filter: "drop-shadow(0 0 10px rgba(34,211,238,0.8)) hue-rotate(180deg) saturate(200%) brightness(120%)" }}
            />
            {/* Araç 1 Uzunluk Cetveli (Üst) */}
            <div className="absolute -top-8 md:-top-12 left-0 w-full border-t border-cyan-400/60 flex justify-between px-1">
               <div className="h-3 md:h-4 w-px bg-cyan-400/60"></div>
               <span className="text-cyan-300 text-[10px] md:text-xs font-mono font-bold -mt-5 md:-mt-6 tracking-widest">{car1.dimensions.length_mm} mm</span>
               <div className="h-3 md:h-4 w-px bg-cyan-400/60"></div>
            </div>
          </div>
        )}

        {/* Araç 2 (Turuncu / Orange X-Ray) */}
        {car2.images?.side_transparent && (
          <div 
            className="absolute bottom-[40px] left-[5%] transition-all duration-700 ease-in-out z-10"
            style={{ width: getSimulatedWidth(car2.dimensions.length_mm) }}
          >
            <img 
              src={car2.images.side_transparent} 
              alt={car2.model} 
              className="w-full h-auto object-contain mix-blend-screen opacity-80 drop-shadow-[0_0_20px_rgba(249,115,22,0.7)]"
              style={{ filter: "drop-shadow(0 0 10px rgba(249,115,22,0.8)) hue-rotate(330deg) saturate(200%) brightness(120%)" }}
            />
            {/* Araç 2 Uzunluk Cetveli (Alt) */}
            <div className="absolute -bottom-8 md:-bottom-12 left-0 w-full border-b border-orange-500/60 flex justify-between px-1">
               <div className="h-3 md:h-4 w-px bg-orange-500/60 -mt-3 md:-mt-4"></div>
               <span className="text-orange-400 text-[10px] md:text-xs font-mono font-bold mt-1 md:mt-2 tracking-widest">{car2.dimensions.length_mm} mm</span>
               <div className="h-3 md:h-4 w-px bg-orange-500/60 -mt-3 md:-mt-4"></div>
            </div>
          </div>
        )}
      </div>

      {/* Lejant (Özet Renk Kodları) */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mt-8 md:mt-12">
        <div className="flex items-center gap-3 bg-slate-800/50 py-2 px-6 rounded-full border border-cyan-900/50">
          <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
          <span className="text-cyan-100 text-sm font-bold tracking-wide">{car1.brand} {car1.model}</span>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/50 py-2 px-6 rounded-full border border-orange-900/50">
          <div className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)]"></div>
          <span className="text-orange-100 text-sm font-bold tracking-wide">{car2.brand} {car2.model}</span>
        </div>
      </div>
    </div>
  );
}
