import React from "react";
import { Search, X, Sparkles, Shield, Heart, Sprout, Soup, Bike, MapPin } from "lucide-react";
import { STORE_CONFIG } from "../data/storeConfig";

export default function Hero({ searchQuery, setSearchQuery, onSelectCategory }) {
  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5] to-white pt-8 pb-10 border-b border-slate-200">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D5A27]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C86D51]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] text-xs font-semibold mb-4 border border-[#2D5A27]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#C86D51]" />
          <span>Katalog Resmi & WhatsApp Order Langsung</span>
        </div>

        {/* Hero Title */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C2826] tracking-tight leading-tight max-w-4xl mx-auto">
          Pilihan Alami untuk <span className="text-[#2D5A27]">Kesehatan Keluarga</span>, <span className="text-[#C86D51]">Dapur Tradisional</span>, & Kebun Asri
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-[#5C6B66] max-w-2xl mx-auto leading-relaxed">
          Stokis resmi HNI HPAI Kalikidang Sokaraja. Sedia madu murni, herbal alami, gerabah tanah liat tradisional, bibit tanaman unggul, hingga titip makanan lokal.
        </p>

        {/* Search Input Field */}
        <div className="mt-6 max-w-xl mx-auto">
          <div className="relative flex items-center shadow-md rounded-2xl bg-white border border-slate-300 focus-within:border-[#2D5A27] focus-within:ring-2 focus-within:ring-[#2D5A27]/20 transition-all overflow-hidden p-1.5">
            <div className="pl-3 text-stone-400">
              <Search className="w-5 h-5 text-[#2D5A27]" />
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk: madu, cobek, kendi, bibit durian, kopi..."
              className="w-full px-3 py-2 text-sm sm:text-base text-[#1C2826] placeholder-stone-400 focus:outline-hidden bg-transparent"
            />

            {searchQuery && (
              <button
                onClick={handleClear}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 mr-1"
                title="Hapus pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => {}}
              className="bg-[#2D5A27] hover:bg-[#23471f] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              Cari
            </button>
          </div>
          {searchQuery && (
            <p className="text-xs text-stone-500 mt-2 text-left px-2">
              Menampilkan hasil pencarian untuk: <strong className="text-[#2D5A27]">"{searchQuery}"</strong>
            </p>
          )}
        </div>

        {/* 4 Pillars Quick Highlights */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl mx-auto">
          <div
            onClick={() => onSelectCategory("herbal")}
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#2D5A27] hover:shadow-xs transition-all cursor-pointer text-left flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#2D5A27]/10 flex items-center justify-center text-[#2D5A27] group-hover:scale-105 transition-transform flex-shrink-0">
              <Heart className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#1C2826] block truncate">Herbal HNI</span>
              <span className="text-[11px] text-[#5C6B66] truncate block">Madu & Imunitas</span>
            </div>
          </div>

          <div
            onClick={() => onSelectCategory("gerabah")}
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#C86D51] hover:shadow-xs transition-all cursor-pointer text-left flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#C86D51]/10 flex items-center justify-center text-[#C86D51] group-hover:scale-105 transition-transform flex-shrink-0">
              <Soup className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#1C2826] block truncate">Gerabah Dapur</span>
              <span className="text-[11px] text-[#5C6B66] truncate block">Tanah Liat Asli</span>
            </div>
          </div>

          <div
            onClick={() => onSelectCategory("kebun")}
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-600 hover:shadow-xs transition-all cursor-pointer text-left flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-100/70 flex items-center justify-center text-emerald-800 group-hover:scale-105 transition-transform flex-shrink-0">
              <Sprout className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#1C2826] block truncate">Kebun & Bibit</span>
              <span className="text-[11px] text-[#5C6B66] truncate block">Pupuk & Tanaman</span>
            </div>
          </div>

          <div
            onClick={() => onSelectCategory("jastip")}
            className="p-3 rounded-xl bg-white border border-slate-200 hover:border-amber-500 hover:shadow-xs transition-all cursor-pointer text-left flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 group-hover:scale-105 transition-transform flex-shrink-0">
              <Bike className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#1C2826] block truncate">Jastip Kuliner</span>
              <span className="text-[11px] text-[#5C6B66] truncate block">Sokaraja & Sekitar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
