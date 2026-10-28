import React, { useState, useEffect } from "react";
import { X, MessageCircle, ShieldCheck, ShoppingBag, Plus, Minus, Check, Share2 } from "lucide-react";
import { createProductOrderUrl } from "../utils/whatsapp";

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : ""
  );
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Gallery items (fallback to thumbnail if gallery empty)
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.thumbnail];

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price);

  const subtotalFormatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price * quantity);

  const handleOrderWhatsapp = () => {
    const waUrl = createProductOrderUrl({
      product,
      variant: selectedVariant,
      quantity,
    });
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleAddCart = () => {
    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedVariant,
        quantity,
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Lihat produk ${product.name} di Warung & Stokis Daryani`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop overlay */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#2D5A27]/10 text-[#2D5A27]">
              {product.categoryName}
            </span>
            {product.status === "preorder" ? (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#C86D51] text-white">
                Pre-Order
              </span>
            ) : (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#2D5A27] text-white">
                Ready Stock
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
              title="Bagikan produk"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-7 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Left: Gallery & Photos */}
            <div className="flex flex-col gap-3">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 border border-slate-200 shadow-inner">
                <img
                  src={gallery[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnails Carousel (Multi-angle photos) */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImageIndex === idx
                          ? "border-[#2D5A27] ring-2 ring-[#2D5A27]/20"
                          : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`Sudut foto ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Safety / Quality Badge */}
              {product.safetyBadge && (
                <div className="bg-[#FAF8F5] border border-amber-200/80 rounded-xl p-3 text-xs sm:text-sm text-stone-700 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#2D5A27] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1C2826] block">Jaminan Keamanan & Mutu:</span>
                    <p className="text-stone-600 mt-0.5">{product.safetyBadge}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Product Info & Actions */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1C2826] leading-tight">
                  {product.name}
                </h2>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#2D5A27]">
                    {formattedPrice}
                  </span>
                  <span className="text-xs text-[#5C6B66]">/ satuan</span>
                </div>

                {/* Dimensions / Size Info */}
                {product.dimension && (
                  <div className="mt-3 p-2.5 rounded-lg bg-stone-100/80 text-xs sm:text-sm text-[#1C2826]">
                    <span className="font-semibold text-[#5C6B66]">📐 Spesifikasi / Ukuran: </span>
                    <span className="font-medium text-[#1C2826]">{product.dimension}</span>
                  </div>
                )}

                {/* Variants Selector */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mt-4">
                    <label className="text-xs font-semibold text-[#5C6B66] uppercase tracking-wider block mb-2">
                      Pilihan Varian / Ukuran
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                            selectedVariant === v
                              ? "bg-[#2D5A27] text-white shadow-xs font-semibold"
                              : "bg-stone-100 hover:bg-stone-200 text-[#1C2826] border border-slate-200"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Stepper */}
                <div className="mt-5 flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-stone-50">
                  <span className="text-sm font-semibold text-[#1C2826]">Jumlah Pesan</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-40 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-bold text-[#1C2826] text-base">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subtotal Preview */}
                <div className="mt-3 flex justify-between items-center text-xs text-[#5C6B66] px-1">
                  <span>Estimasi Subtotal:</span>
                  <span className="font-bold text-[#1C2826] text-sm">{subtotalFormatted}</span>
                </div>

                {/* Description */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-bold text-[#5C6B66] uppercase tracking-wider mb-1.5">
                    Deskripsi Lengkap
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleAddCart}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border-2 border-[#2D5A27] text-[#2D5A27] hover:bg-[#2D5A27]/5 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Tambah ke Keranjang</span>
          </button>

          <button
            onClick={handleOrderWhatsapp}
            className="w-full flex-1 bg-[#2D5A27] hover:bg-[#21431d] active:scale-[0.99] text-white py-3 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-[#2D5A27]/25 transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-current stroke-none" />
            <span>Tanya / Order via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
