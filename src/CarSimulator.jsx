import React, { useState } from 'react';

export default function CarSimulator({ car1, car2 }) {
  const [alignmentMode, setAlignmentMode] = useState('bumper'); // 'bumper' | 'axle'
  const [highlightDifferences, setHighlightDifferences] = useState(false);
  const [opacity1, setOpacity1] = useState(90);
  const [opacity2, setOpacity2] = useState(80);

  if (!car1 || !car2) return null;

  // 1. Ölçekleme ve Hizalama Mantığı (Surgical Precision Math)
  // Sabit render alanı oluşturmak için maksimum uzunluğu buluyoruz. (Ekranın %85'ine sığacak şekilde)
  const maxLength = Math.max(car1.dimensions.length_mm, car2.dimensions.length_mm);
  const scaleRatio = 85 / maxLength; // Her 1 mm'nin ekrandaki yüzde (%) karşılığı
  
  const getSimulatedWidthPercentage = (length) => length * scaleRatio;

  // Hizalama Ofsetleri (Translation Logic)
  // Eğer Ön Aks (Front Axle) seçilirse, arabaları ön tamponlarından farklı oranlarda geriye (sola) çekeriz.
  // Referans çizgisi (Ön Aks Çizgisi) container'ın %25'i olsun.
  const referenceLine = 25; 
  
  const getLeftPosition = (car) => {
    if (alignmentMode === 'bumper') return '5%';
    
    // Axle hizalamasında: Araba görselinin sol başlangıç noktası = (Referans Çizgisi) - (Önce Çıkıntı yüzdesi)
    const overhangPercentage = car.dimensions.front_overhang_mm * scaleRatio;
    return `${referenceLine - overhangPercentage}%`;
  };

  const getAxleLineCSS = () => {
    if (alignmentMode === 'bumper') return { left: '5%' };
    return { left: `${referenceLine}%` };
  };

  const blendModeStr = highlightDifferences ? "mix-blend-difference" : "mix-blend-screen";

  return (
    <div className="w-full bg-slate-900 border border-slate-700/50 rounded-3xl p-4 md:p-8 shadow-2xl relative fade-in mb-12">
      
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 pb-6 border-b border-white/10 gap-6">
        <h3 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-400 tracking-[0.2em] uppercase">
          Pro X-Ray Simülatör
        </h3>
        
        {/* Ghost Controls */}
        <div className="flex flex-col sm:flex-row gap-6 bg-slate-800/50 p-4 rounded-2xl border border-white/5 w-full lg:w-auto">
          <div className="flex flex-col gap-2">
             <label className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex justify-between">
                <span>{car1.brand} Opaklık</span> <span>{opacity1}%</span>
             </label>
             <input type="range" min="0" max="100" value={opacity1} onChange={(e) => setOpacity1(e.target.value)} className="w-32 accent-cyan-400" />
          </div>
          <div className="flex flex-col gap-2 border-l border-white/10 pl-0 sm:pl-6">
             <label className="text-xs font-bold text-orange-400 uppercase tracking-widest flex justify-between">
                <span>{car2.brand} Opaklık</span> <span>{opacity2}%</span>
             </label>
             <input type="range" min="0" max="100" value={opacity2} onChange={(e) => setOpacity2(e.target.value)} className="w-32 accent-orange-500" />
          </div>
        </div>
      </div>

      {/* Alignment Toggles */}
      <div className="flex flex-wrap gap-4 mb-8">
         <button 
           className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${alignmentMode === 'bumper' ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
           onClick={() => setAlignmentMode('bumper')}
         >
           Ön Tampon Hizala
         </button>
         <button 
           className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${alignmentMode === 'axle' ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
           onClick={() => setAlignmentMode('axle')}
         >
           Ön Aks (Tekerlek) Hizala
         </button>
         <button 
           className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${highlightDifferences ? 'bg-rose-900/60 border-rose-500 text-rose-200' : 'bg-slate-800/30 border-slate-600 text-slate-400'}`}
           onClick={() => setHighlightDifferences(!highlightDifferences)}
         >
           {highlightDifferences ? "X-Ray Modu: Farkları Vurgulama" : "X-Ray Modu: Şeffaf"}
         </button>
      </div>

      {/* Mobile Landscape Notice */}
      <div className="md:hidden flex items-center justify-center p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl mb-6 text-yellow-200 text-xs font-bold text-center">
        <span className="text-lg mr-2">📱</span> Milimetrik hassasiyette görselleştirme için cihazınızı yan çevirmeniz (Landscape) önerilir.
      </div>

      {/* Blueprint Alanı */}
      <div className="relative w-full h-[250px] md:h-[400px] bg-slate-950 rounded-2xl border border-blue-900/40 flex items-end justify-start overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* Karolu Grid Arkaplanı */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>

        {/* Zemin Çizgisi */}
        <div className="absolute bottom-[40px] w-full border-b-2 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-0"></div>
        
        {/* Referans Hizalama (Sıfır Noktası) Dikey Çizgisi */}
        <div className="absolute bottom-0 h-full border-l border-dashed border-slate-400/50 z-0 transition-all duration-700" style={getAxleLineCSS()}>
           <span className="absolute bottom-[10px] left-2 text-[9px] text-slate-400 font-mono tracking-widest uppercase">{alignmentMode === 'axle' ? "Ön Aks Sıfır Noktası" : "Ön Tampon Sıfır Noktası"}</span>
        </div>

        {/* Araç 1 (Mavi) */}
        {car1.images?.side_transparent && (
          <div 
            className="absolute bottom-[40px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20 pointer-events-none"
            style={{ 
              width: `${getSimulatedWidthPercentage(car1.dimensions.length_mm)}%`, 
              left: getLeftPosition(car1),
              opacity: opacity1 / 100
            }}
          >
            <img 
              src={car1.images.side_transparent} 
              alt={car1.model} 
              className={`w-full h-auto object-contain transition-all duration-500 ${blendModeStr}`}
              style={{ filter: "drop-shadow(0 0 10px rgba(34,211,238,0.5)) hue-rotate(180deg) saturate(200%) brightness(120%)" }}
            />
            {/* Araç 1 Uzunluk Cetveli */}
            <div className="absolute -top-6 left-0 w-full border-t border-cyan-400/60 flex justify-between px-1">
               <div className="h-2 w-px bg-cyan-400/60"></div>
               <span className="text-cyan-300 text-[9px] font-mono font-bold -mt-4">{car1.dimensions.length_mm} mm</span>
               <div className="h-2 w-px bg-cyan-400/60"></div>
            </div>
          </div>
        )}

        {/* Araç 2 (Turuncu) */}
        {car2.images?.side_transparent && (
          <div 
            className="absolute bottom-[40px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10 pointer-events-none"
            style={{ 
              width: `${getSimulatedWidthPercentage(car2.dimensions.length_mm)}%`, 
              left: getLeftPosition(car2),
              opacity: opacity2 / 100
            }}
          >
            <img 
              src={car2.images.side_transparent} 
              alt={car2.model} 
              className={`w-full h-auto object-contain transition-all duration-500 ${blendModeStr}`}
              style={{ filter: "drop-shadow(0 0 10px rgba(249,115,22,0.5)) hue-rotate(330deg) saturate(200%) brightness(120%)" }}
            />
            {/* Araç 2 Uzunluk Cetveli */}
            <div className="absolute -bottom-6 left-0 w-full border-b border-orange-500/60 flex justify-between px-1">
               <div className="h-2 w-px bg-orange-500/60 -mt-2"></div>
               <span className="text-orange-400 text-[9px] font-mono font-bold mt-1">{car2.dimensions.length_mm} mm</span>
               <div className="h-2 w-px bg-orange-500/60 -mt-2"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
