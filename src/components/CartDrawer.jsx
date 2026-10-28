import React from "react";
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { createCartOrderUrl } from "../utils/whatsapp";

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formattedTotal = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(totalAmount);

  const handleCheckoutWA = () => {
    if (cartItems.length === 0) return;
    const waUrl = createCartOrderUrl(cartItems);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2D5A27]" />
              <h2 className="text-base sm:text-lg font-bold text-[#1C2826]">
                Keranjang Belanja ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-stone-700">Keranjang Masih Kosong</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Silakan pilih produk herbal, gerabah tradisional, atau bibit tanaman untuk ditambahkan ke sini.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 text-xs font-bold text-[#2D5A27] hover:underline"
                >
                  Mulai Belanja Sekarang &rarr;
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemSubtotal = new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(item.price * item.quantity);

                return (
                  <div
                    key={`${item.id}-${item.selectedVariant || "default"}`}
                    className="flex gap-3 p-3 rounded-xl border border-slate-200 bg-white shadow-xs"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-stone-100"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-[#1C2826] line-clamp-1">
                            {item.name}
                          </h4>
                          {item.selectedVariant && (
                            <span className="text-[11px] text-[#5C6B66] font-medium">
                              Varian: {item.selectedVariant}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id, item.selectedVariant)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          title="Hapus item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 border border-slate-200 rounded-lg bg-stone-50 px-1 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.selectedVariant, item.quantity - 1)}
                            className="p-1 hover:text-[#2D5A27] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#1C2826] w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.selectedVariant, item.quantity + 1)}
                            className="p-1 hover:text-[#2D5A27] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs sm:text-sm font-bold text-[#2D5A27]">
                          {itemSubtotal}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Checkout button */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-[#FAF8F5] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5C6B66]">Total Belanja:</span>
                <span className="text-lg sm:text-xl font-extrabold text-[#1C2826]">
                  {formattedTotal}
                </span>
              </div>

              <p className="text-[11px] text-stone-500">
                Ongkir akan dihitung dan dikonfirmasi langsung oleh admin sesuai alamat tujuan Anda.
              </p>

              <button
                onClick={handleCheckoutWA}
                className="w-full bg-[#2D5A27] hover:bg-[#21431d] active:scale-[0.99] text-white py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#2D5A27]/25 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current stroke-none" />
                <span>Pesan Semua via WhatsApp</span>
              </button>

              <button
                onClick={onClearCart}
                className="w-full text-center text-xs text-stone-500 hover:text-red-600 transition-colors pt-1"
              >
                Kosongkan Keranjang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
