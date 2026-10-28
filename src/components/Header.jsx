import React from "react";
import { MapPin, MessageCircle, ShoppingBag, Menu, Sparkles, Navigation } from "lucide-react";
import { STORE_CONFIG } from "../data/storeConfig";
import { createGeneralConsultUrl } from "../utils/whatsapp";

export default function Header({ cartCount, onOpenCart, onCategorySelect, activeCategory }) {
  const adminWaUrl = createGeneralConsultUrl();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice (Mobile / Desktop) */}
      <div className="bg-[#2D5A27] text-white py-1 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="truncate">Toko Fisik Buka Hari Ini • Kalikidang, Sokaraja</span>
          </div>
          
          <a
            href={STORE_CONFIG.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-emerald-100 hover:text-white transition-colors underline text-[11px]"
          >
            <Navigation className="w-3 h-3" />
            <span>📍 Sokaraja, Banyumas (Lihat Peta)</span>
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => onCategorySelect("all")} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Logo Mark */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#2D5A27] group-hover:bg-[#23471f] flex items-center justify-center text-white shadow-xs transition-colors">
            <span className="font-extrabold text-base sm:text-lg tracking-wider">SD</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-[#1C2826] tracking-tight group-hover:text-[#2D5A27] transition-colors leading-tight">
                {STORE_CONFIG.shortName}
              </h1>
              <span className="hidden md:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FAF8F5] text-[#2D5A27] border border-[#2D5A27]/20">
                Warung Alami
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#5C6B66] font-medium truncate max-w-[200px] sm:max-w-none">
              Stokis HPAI & Gerabah Kalikidang, Sokaraja
            </p>
          </div>
        </div>

        {/* Action Buttons: Maps Quick Link, WA Admin, Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Link Google Maps button */}
          <a
            href={STORE_CONFIG.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors border border-slate-200"
            title="Buka rute Google Maps ke toko kami di Sokaraja"
          >
            <MapPin className="w-4 h-4 text-[#C86D51]" />
            <span className="hidden sm:inline">Peta Toko</span>
          </a>

          {/* Contact Admin WA */}
          <a
            href={adminWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20 text-[#2D5A27] text-xs font-bold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Admin</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2D5A27] text-white hover:bg-[#21431d] text-xs font-semibold shadow-xs transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Keranjang</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#C86D51] text-white text-[11px] font-bold flex items-center justify-center -ml-1 sm:ml-0 animate-scale">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
