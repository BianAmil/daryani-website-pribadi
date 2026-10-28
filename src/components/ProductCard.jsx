import React from "react";
import { MessageCircle, Eye, ShoppingBag } from "lucide-react";
import { createProductOrderUrl } from "../utils/whatsapp";

export default function ProductCard({ product, onSelectProduct, onAddToCart }) {
  const isPreOrder = product.status === "preorder";
  
  // Format currency
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price);

  const handleDirectBuy = (e) => {
    e.stopPropagation();
    const defaultVariant = product.variants && product.variants.length > 0 ? product.variants[0] : "";
    const waUrl = createProductOrderUrl({
      product,
      variant: defaultVariant,
      quantity: 1,
    });
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleAddCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#2D5A27]/40 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Thumbnail Aspect Ratio 1:1 */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <img
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
        />

        {/* Status Badge (Top-Left) */}
        <div className="absolute top-2.5 left-2.5 z-10">
          {isPreOrder ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#C86D51] text-white shadow-xs">
              Pre-Order
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#2D5A27] text-white shadow-xs">
              Ready Stock
            </span>
          )}
        </div>

        {/* Category Pill (Top-Right) */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-black/45 backdrop-blur-md text-white">
            {product.categoryName}
          </span>
        </div>

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-stone-900/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="bg-white/95 text-[#1C2826] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
            <Eye className="w-3.5 h-3.5" /> Lihat Detail
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Dimension / Small spec teaser */}
          {product.dimension && (
            <p className="text-[11px] text-[#5C6B66] font-medium mb-1 line-clamp-1">
              📏 {product.dimension}
            </p>
          )}

          {/* Product Name (Truncate 2 baris) */}
          <h3 className="text-sm sm:text-base font-semibold text-[#1C2826] line-clamp-2 leading-snug group-hover:text-[#2D5A27] transition-colors">
            {product.name}
          </h3>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-[#5C6B66] font-medium block">Harga</span>
              <span className="text-base sm:text-lg font-bold text-[#1C2826]">
                {formattedPrice}
              </span>
            </div>
            
            {/* Quick add to cart icon button */}
            <button
              onClick={handleAddCart}
              title="Tambah ke keranjang belanja"
              className="p-2 rounded-lg bg-stone-100 hover:bg-[#2D5A27]/10 text-stone-700 hover:text-[#2D5A27] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Action Button: Width 100%, Background #2D5A27, Text "Beli via WA" + Icon WA */}
          <button
            onClick={handleDirectBuy}
            className="w-full bg-[#2D5A27] hover:bg-[#23471f] active:scale-[0.98] text-white py-2.5 px-3 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 fill-current stroke-none" />
            <span>Beli via WA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
