import React from "react";
import { Sparkles, Heart, Soup, Sprout, Bike } from "lucide-react";

export default function CategoryFilter({ activeCategory, onSelectCategory, counts }) {
  const categories = [
    { id: "all", label: "Semua Produk", icon: Sparkles, count: counts.all },
    { id: "herbal", label: "Herbal & Madu", icon: Heart, count: counts.herbal },
    { id: "gerabah", label: "Gerabah Dapur", icon: Soup, count: counts.gerabah },
    { id: "kebun", label: "Kebun & Bibit", icon: Sprout, count: counts.kebun },
    { id: "jastip", label: "Jastip Kuliner", icon: Bike, count: counts.jastip, highlight: true },
  ];

  return (
    <div className="sticky top-16 sm:top-18 z-30 bg-[#FAF8F5]/95 backdrop-blur-md py-3 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  isActive
                    ? cat.id === "gerabah"
                      ? "bg-[#C86D51] text-white shadow-sm ring-2 ring-[#C86D51]/30"
                      : "bg-[#2D5A27] text-white shadow-sm ring-2 ring-[#2D5A27]/30"
                    : "bg-white text-[#1C2826] hover:bg-stone-100 border border-slate-200"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#5C6B66]"}`} />
                <span>{cat.label}</span>
                {typeof cat.count === "number" && (
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-[11px] ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-stone-100 text-[#5C6B66]"
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
                {cat.id === "jastip" && (
                  <span className="ml-1 text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-stone-900">
                    Lokal
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
