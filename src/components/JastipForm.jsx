import React, { useState } from "react";
import { Send, Bike, Sparkles, MapPin, CheckCircle2, Clock, Info } from "lucide-react";
import { createJastipOrderUrl } from "../utils/whatsapp";
import { JASTIP_RECOMMENDATIONS } from "../data/jastipRecommendations";

export default function JastipForm() {
  const [formData, setFormData] = useState({
    name: "",
    orderDetails: "",
    address: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectRecommendation = (item) => {
    setFormData((prev) => {
      const current = prev.orderDetails ? prev.orderDetails.trim() : "";
      const addition = `${item.title} (${item.popularVariant})`;
      const updatedDetails = current ? `${current}\n- ${addition}` : addition;
      return {
        ...prev,
        orderDetails: updatedDetails,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.orderDetails.trim() || !formData.address.trim()) {
      alert("Mohon lengkapi Nama, Detail Pesanan, dan Alamat Pengiriman terlebih dahulu.");
      return;
    }

    const waUrl = createJastipOrderUrl({
      name: formData.name,
      orderDetails: formData.orderDetails,
      address: formData.address,
      notes: formData.notes,
    });

    setSubmitted(true);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-8">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-[#2D5A27] to-[#3b7233] text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md mb-3">
            <Bike className="w-3.5 h-3.5" /> Layanan Jastip Kuliner Lokal
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Titip Kuliner Favorit Banyumas & Sokaraja
          </h2>
          <p className="mt-2 text-stone-100 text-sm sm:text-base leading-relaxed">
            Ingin makan Soto Kecik Sokaraja, Getuk Goreng Tohirin yang masih hangat, atau Mendoan Sawangan tapi tidak sempat keluar? Admin Stokis Daryani siap belikan dan antar ke alamat Anda!
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs sm:text-sm font-medium text-stone-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Area Sokaraja, Kalikidang & Sekitarnya
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-300" /> Jadwal Cepat & Fleksibel
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Request Jastip (Card putih dengan border-radius 12px dan shadow-sm) */}
        <div className="lg:col-span-7 bg-white rounded-[12px] p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#1C2826] flex items-center gap-2">
              <span>Formulir Titip Pesanan</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6B66] mt-1">
              Isi data di bawah ini, pesanan akan langsung diteruskan ke WhatsApp Admin untuk konfirmasi slot & tarif.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Field 1: Nama Pemesan */}
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-bold text-[#1C2826] mb-1.5">
                Nama Pemesan <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Ibu Rina / Pak Joko"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27] focus:border-[#2D5A27] text-sm text-[#1C2826] transition-all bg-white"
              />
            </div>

            {/* Field 2: Detail Pesanan & Toko Asal */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="orderDetails" className="block text-xs sm:text-sm font-bold text-[#1C2826]">
                  Detail Pesanan & Toko Asal <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-[#5C6B66]">Klik rekomendasi di kanan untuk auto-isi</span>
              </div>
              <textarea
                id="orderDetails"
                name="orderDetails"
                required
                rows={4}
                value={formData.orderDetails}
                onChange={handleChange}
                placeholder="Contoh: Nasi Goreng Pak X (2 porsi), Es Kopi Y (1)"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27] focus:border-[#2D5A27] text-sm text-[#1C2826] transition-all bg-white resize-y"
              />
            </div>

            {/* Field 3: Alamat Pengiriman */}
            <div>
              <label htmlFor="address" className="block text-xs sm:text-sm font-bold text-[#1C2826] mb-1.5">
                Alamat Pengiriman <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows={2}
                value={formData.address}
                onChange={handleChange}
                placeholder="Alamat rumah / jalan, RT/RW, Desa Kalikidang / Sokaraja (cantumkan patokan jika ada)"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27] focus:border-[#2D5A27] text-sm text-[#1C2826] transition-all bg-white resize-y"
              />
            </div>

            {/* Field 4: Catatan Tambahan (Optional) */}
            <div>
              <label htmlFor="notes" className="block text-xs sm:text-sm font-bold text-[#1C2826] mb-1.5">
                Catatan Tambahan <span className="text-[#5C6B66] font-normal text-xs">(Opsional)</span>
              </label>
              <input
                id="notes"
                name="notes"
                type="text"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Contoh: Kuah dipisah, pedas sedang, bungkus plastik dobel"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27] focus:border-[#2D5A27] text-sm text-[#1C2826] transition-all bg-white"
              />
            </div>

            {/* Submit Button: Width 100%, Background #2D5A27, Text "💬 Kirim Request ke WhatsApp" */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#2D5A27] hover:bg-[#21431d] active:scale-[0.99] text-white py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-[#2D5A27]/20 transition-all duration-200"
              >
                <span>💬 Kirim Request ke WhatsApp</span>
              </button>
            </div>

            {/* Flow Info Helper */}
            <div className="flex items-center gap-2 p-3 bg-[#FAF8F5] rounded-lg text-xs text-[#5C6B66] border border-slate-100">
              <Info className="w-4 h-4 text-[#2D5A27] flex-shrink-0" />
              <span>Setelah dikirim, WhatsApp Anda akan terbuka dengan teks formulir yang otomatis terformat rapi.</span>
            </div>
          </form>
        </div>

        {/* Right Column: Rekomendasi Jajanan Sokaraja & Banyumas */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#1C2826] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C86D51]" /> Inspirasi Jajanan Populer
            </h4>
            <span className="text-xs text-[#5C6B66]">Klik untuk tambah</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {JASTIP_RECOMMENDATIONS.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectRecommendation(item)}
                className="group p-3 rounded-xl bg-white border border-slate-200 hover:border-[#2D5A27] hover:shadow-md transition-all cursor-pointer flex items-center gap-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {item.badge}
                    </span>
                    <span className="text-[11px] text-[#5C6B66] truncate">{item.origin}</span>
                  </div>
                  <h5 className="text-xs sm:text-sm font-bold text-[#1C2826] group-hover:text-[#2D5A27] transition-colors truncate">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-emerald-800 font-medium mt-0.5">
                    Estimasi: {item.estimatedPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice Card */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1">
            <span className="font-bold block">💡 Mau pesan makanan atau toko lain?</span>
            <p className="text-amber-800/90 leading-relaxed">
              Tentu bisa! Cukup ketik langsung nama toko atau menu favorit Anda pada kolom formulir di atas. Admin akan segera mengecek ketersediaan dan rute pengantaran.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
