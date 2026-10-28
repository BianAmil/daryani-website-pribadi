import React from "react";
import { MapPin, Navigation, Clock, ShieldCheck, HeartHandshake, PhoneCall } from "lucide-react";
import { STORE_CONFIG } from "../data/storeConfig";
import { createGeneralConsultUrl } from "../utils/whatsapp";

export default function StoreInfoSection() {
  const adminWaUrl = createGeneralConsultUrl();

  return (
    <section className="py-12 bg-[#FAF8F5] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Store Information */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] text-xs font-bold mb-3">
                  <MapPin className="w-3.5 h-3.5" /> Toko Fisik Terpercaya
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1C2826] tracking-tight">
                  Kunjungi Toko Fisik Kami di Sokaraja
                </h3>

                <p className="mt-2 text-sm text-[#5C6B66] leading-relaxed">
                  Selain pemesanan online via WhatsApp, Anda juga dapat datang langsung ke toko kami untuk memilih berbagai ukuran kendi, cobek, pot gerabah, bibit tanaman, serta berkonsultasi seputar produk herbal HNI HPAI.
                </p>

                {/* Details List */}
                <div className="mt-6 space-y-3.5 text-xs sm:text-sm text-[#1C2826]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#C86D51] flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-stone-800">Alamat Lengkap:</strong>
                      <span className="text-[#5C6B66]">{STORE_CONFIG.address.full}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#2D5A27] flex-shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-stone-800">Jam Buka:</strong>
                      <span className="text-[#5C6B66]">{STORE_CONFIG.openingHours}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-stone-800">Legalitas & Keaslian:</strong>
                      <span className="text-[#5C6B66]">Stokis Resmi Terdaftar HNI HPAI ID Sokaraja Banyumas</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3">
                <a
                  href={STORE_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D5A27] hover:bg-[#23471f] text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>📍 Buka Petunjuk Arah Google Maps</span>
                </a>

                <a
                  href={adminWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-stone-50 text-[#1C2826] font-semibold text-xs sm:text-sm transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-[#2D5A27]" />
                  <span>Tanya Rute / Info Toko</span>
                </a>
              </div>
            </div>

            {/* Map Preview Graphic */}
            <div className="lg:col-span-5 bg-stone-100 p-6 sm:p-8 flex flex-col justify-center items-center text-center border-t lg:border-t-0 lg:border-l border-slate-200">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#2D5A27] mb-4">
                <MapPin className="w-8 h-8 text-[#C86D51]" />
              </div>
              <h4 className="font-bold text-base text-[#1C2826]">
                Google Maps Pin Lokasi
              </h4>
              <p className="text-xs text-[#5C6B66] mt-1 max-w-xs leading-relaxed">
                Navigasi GPS presisi langsung ke titik toko Stokis HPAI Daryani di Kalikidang, Sokaraja.
              </p>

              <div className="mt-5 w-full max-w-xs bg-white rounded-xl p-3 border border-slate-200 shadow-xs text-left">
                <span className="text-[10px] uppercase font-bold text-[#5C6B66] block">Titik Koordinat:</span>
                <span className="text-xs font-semibold text-[#1C2826] block truncate">
                  Kalikidang, Kec. Sokaraja, Kab. Banyumas
                </span>
                <span className="text-[11px] text-emerald-800 font-medium block mt-1">
                  ⭐ Toko Fisik Aktif
                </span>
              </div>

              <a
                href={STORE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs font-bold text-[#2D5A27] hover:underline flex items-center gap-1"
              >
                Klik di sini untuk rute jalan langsung &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
