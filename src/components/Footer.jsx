import React from "react";
import { MapPin, MessageCircle, Clock, Heart, ShieldCheck, Phone, Navigation } from "lucide-react";
import { STORE_CONFIG } from "../data/storeConfig";
import { createGeneralConsultUrl } from "../utils/whatsapp";

export default function Footer({ onCategorySelect }) {
  const adminWaUrl = createGeneralConsultUrl();

  return (
    <footer className="bg-[#1C2826] text-white pt-14 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info & Physical Store Credibility */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D5A27] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                SD
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {STORE_CONFIG.name}
                </h3>
                <p className="text-xs text-stone-300">
                  Stokis Resmi HPAI & Warung Tradisional Banyumas
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed pr-4">
              Menyediakan ragam produk herbal alami berkualitas dari HNI HPAI, perabot dapur tanah liat tradisional (gerabah), bibit tanaman unggul dan pupuk organik, serta kemudahan jastip kuliner lokal khas Sokaraja dan Banyumas.
            </p>

            {/* Direct Address */}
            <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700/60 text-xs sm:text-sm text-stone-300 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C86D51] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Alamat Toko Fisik:</span>
                  <p className="text-stone-300 leading-snug">
                    {STORE_CONFIG.address.full}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1 border-t border-stone-700/50">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-stone-300 text-xs">
                  Jam Operasional: <strong className="text-white">{STORE_CONFIG.openingHours}</strong>
                </span>
              </div>
            </div>

            {/* Button Group: [📍 Petunjuk Arah Google Maps] & [💬 Hubungi Admin WA] */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={STORE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#C86D51] hover:bg-[#b05d43] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>📍 Petunjuk Arah Google Maps</span>
              </a>

              <a
                href={adminWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2D5A27] hover:bg-[#23471f] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current stroke-none" />
                <span>💬 Hubungi Admin WA</span>
              </a>
            </div>
          </div>

          {/* Quick Categories Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-200">
              Kategori Produk
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <button
                  onClick={() => onCategorySelect("herbal")}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  🌿 Herbal HNI & Madu Murni
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect("gerabah")}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  🏺 Gerabah Dapur Tanah Liat
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect("kebun")}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  🌱 Kebun & Bibit Tanaman
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect("jastip")}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  🛵 Jastip Kuliner Sokaraja
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect("all")}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  ✨ Semua Katalog Produk
                </button>
              </li>
            </ul>
          </div>

          {/* Guarantees & Trust Information */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-200">
              Jaminan & Layanan Kami
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>100% Produk HNI Asli:</strong> Disuplai langsung dari stokis resmi terdaftar.</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Garansi Gerabah Aman:</strong> Dilapisi packing jerami/kayu & bubble wrap ekstra tebal.</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Pemesanan Tanpa Ribet:</strong> Tanpa perlu registrasi akun, langsung terhubung ke WhatsApp.</span>
              </div>
            </div>

            {/* Embedded Google Maps Preview Link Card */}
            <div className="mt-4 p-3 rounded-xl bg-stone-800 border border-stone-700 text-stone-300">
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C86D51]" /> Lokasi di Google Maps
                </span>
                <span className="text-emerald-400 text-[11px]">Sokaraja, Banyumas</span>
              </div>
              <p className="text-[11px] text-stone-300 mb-2">
                Kunjungi toko fisik kami di Kalikidang untuk memilih gerabah & herbal langsung.
              </p>
              <a
                href={STORE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline flex items-center gap-1"
              >
                Buka Peta Google Maps &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.name}. Semua hak cipta dilindungi.</p>
          <p className="flex items-center gap-1 text-stone-400">
            Dibuat dengan cinta untuk warga Banyumas, Sokaraja & sekitarnya
          </p>
        </div>
      </div>
    </footer>
  );
}
