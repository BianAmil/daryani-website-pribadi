import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import JastipForm from "./components/JastipForm";
import CartDrawer from "./components/CartDrawer";
import StoreInfoSection from "./components/StoreInfoSection";
import Footer from "./components/Footer";
import FloatingWhatsapp from "./components/FloatingWhatsapp";

import productsData from "./data/products.json";
import { STORE_CONFIG } from "./data/storeConfig";
import { SlidersHorizontal, ArrowUpDown, PackageX, Sparkles, Check } from "lucide-react";

export default function App() {
  const [products] = useState(productsData);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [toast, setToast] = useState(null);

  // Category counts
  const counts = useMemo(() => {
    return {
      all: products.length,
      herbal: products.filter((p) => p.category === "herbal").length,
      gerabah: products.filter((p) => p.category === "gerabah").length,
      kebun: products.filter((p) => p.category === "kebun").length,
      jastip: "Lokal",
    };
  }, [products]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== "all" && activeCategory !== "jastip") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  // Toast trigger helper
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Add item to cart
  const handleAddToCart = (productWithDetails) => {
    setCartItems((prevItems) => {
      const variantKey = productWithDetails.selectedVariant || (productWithDetails.variants ? productWithDetails.variants[0] : "");
      const existingIndex = prevItems.findIndex(
        (item) => item.id === productWithDetails.id && item.selectedVariant === variantKey
      );

      const qtyToAdd = productWithDetails.quantity || 1;

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += qtyToAdd;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: productWithDetails.id,
            name: productWithDetails.name,
            price: productWithDetails.price,
            thumbnail: productWithDetails.thumbnail,
            selectedVariant: variantKey,
            quantity: qtyToAdd,
          },
        ];
      }
    });

    showToast(`"${productWithDetails.name}" berhasil ditambahkan ke keranjang.`);
    if (selectedProduct) {
      setSelectedProduct(null);
    }
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (id, selectedVariant, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id, selectedVariant);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedVariant === selectedVariant
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (id, selectedVariant) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedVariant === selectedVariant)
      )
    );
  };

  // Clear all items
  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C2826] font-sans antialiased">
      {/* Toast Notification */}
      {toast && (
        <aside 
          role="status" 
          aria-live="polite" 
          className="fixed top-20 right-4 sm:right-8 z-50 bg-[#1C2826] text-white px-4 py-3 rounded-xl shadow-xl border border-stone-700 flex items-center gap-2.5 text-xs sm:text-sm animate-in slide-in-from-top-4 duration-300"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white flex-shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toast}</span>
        </aside>
      )}

      {/* Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onCategorySelect={(cat) => {
          setActiveCategory(cat);
          setSearchQuery("");
        }}
        activeCategory={activeCategory}
      />

      {/* Hero & Search Section */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery("");
          window.scrollTo({ top: 350, behavior: "smooth" });
        }}
      />

      {/* Category Navigation Bar (Horizontal Scroll Filter) */}
      <CategoryFilter
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
        }}
        counts={counts}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* If Active Category is Jastip, render the Jastip Form Card exclusively */}
        {activeCategory === "jastip" ? (
          <JastipForm />
        ) : (
          <div>
            {/* Control Bar: Filter label & Sorter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1C2826]">
                  {activeCategory === "all"
                    ? "Semua Produk Unggulan"
                    : activeCategory === "herbal"
                    ? "🌿 Produk Herbal HNI & Madu Murni"
                    : activeCategory === "gerabah"
                    ? "🏺 Kerajinan Gerabah Dapur Tanah Liat"
                    : "🌱 Bibit Tanaman & Pupuk Organik"}
                </h2>
                <p className="text-xs sm:text-sm text-[#5C6B66] mt-0.5">
                  Menampilkan {filteredProducts.length} produk siap pesan via WhatsApp
                </p>
              </div>

              {/* Sorting dropdown */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <ArrowUpDown className="w-4 h-4 text-[#5C6B66]" />
                <span className="text-xs text-[#5C6B66] font-medium">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-[#1C2826] font-medium focus:outline-hidden focus:ring-1 focus:ring-[#2D5A27] cursor-pointer"
                >
                  <option value="default">Paling Sesuai</option>
                  <option value="price-low">Harga: Termurah</option>
                  <option value="price-high">Harga: Tertinggi</option>
                  <option value="name">Nama Produk (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
                <PackageX className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-stone-700">Produk Tidak Ditemukan</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Tidak ada produk yang cocok dengan kata kunci "{searchQuery}". Silakan coba kata kunci lain atau hubungi admin via WhatsApp.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#2D5A27] text-white text-xs font-semibold"
                >
                  Reset Pencarian
                </button>
              </div>
            ) : (
              /* Product Cards Grid: 2 kolom pada HP, 4 kolom pada Desktop */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {/* Jastip Promo Teaser (Shown on 'all' tab) */}
            {activeCategory === "all" && !searchQuery && (
              <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#FAF8F5] to-emerald-500/10 border border-amber-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1.5 text-center md:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Layanan Istimewa Sokaraja
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1C2826]">
                    Mau Titip Makanan atau Oleh-Oleh Khas Banyumas?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C6B66] max-w-xl">
                    Kami melayani jastip Getuk Goreng Tohirin, Soto Kecik Sokaraja, Mendoan, Nopia & kuliner sekitar langsung ke rumah Anda.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveCategory("jastip");
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                  className="px-5 py-3 rounded-xl bg-[#2D5A27] hover:bg-[#21431d] text-white text-xs sm:text-sm font-bold shadow-xs whitespace-nowrap transition-colors"
                >
                  Buka Form Jastip Kuliner &rarr;
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Store Credibility & Physical Location Section */}
      <StoreInfoSection />

      {/* Footer */}
      <Footer
        onCategorySelect={(cat) => {
          setActiveCategory(cat);
          setSearchQuery("");
          window.scrollTo({ top: 350, behavior: "smooth" });
        }}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Multi-Item Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating WhatsApp Quick Contact Button */}
      <FloatingWhatsapp />
    </div>
  );
}
