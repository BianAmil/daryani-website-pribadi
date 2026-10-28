import React from "react";
import { MessageCircle } from "lucide-react";
import { createGeneralConsultUrl } from "../utils/whatsapp";

export default function FloatingWhatsapp() {
  const waUrl = createGeneralConsultUrl();

  return (
    <aside aria-label="Bantuan WhatsApp" className="fixed bottom-5 right-5 z-40 flex items-center group">
      {/* Tooltip text */}
      <div className="hidden sm:block mr-3 bg-white px-3 py-1.5 rounded-full shadow-lg border border-slate-200 text-xs font-semibold text-[#1C2826] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        💬 Tanya Admin Stokis
      </div>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full bg-[#2D5A27] hover:bg-[#23471f] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-hidden ring-4 ring-white"
        aria-label="Chat WhatsApp Admin Stokis Daryani"
      >
        <span className="absolute inset-0 rounded-full bg-[#2D5A27] animate-ping opacity-30"></span>
        <MessageCircle className="w-7 h-7 fill-current stroke-none relative z-10" />
      </a>
    </aside>
  );
}
