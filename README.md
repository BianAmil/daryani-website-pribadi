# Warung Serba Alami & Stokis Daryani

Website resmi & platform katalog digital responsif *direct-to-WhatsApp order* untuk toko fisik **Stokis HPAI Daryani** (Kalikidang, Sokaraja, Banyumas).

Mengintegrasikan 4 pilar utama produk dan layanan:
1. **🌿 Kesehatan Alami:** Produk Herbal HNI HPAI & Madu Hutan Murni.
2. **🏺 Dapur Tradisional:** Peralatan dapur tanah liat / gerabah (kendi, cobek, wajan sangrai, poci teh).
3. **🌱 Kebun & Taman:** Bibit tanaman buah & herbal unggul serta pupuk kompos organik.
4. **🛵 Jastip Kuliner:** Layanan titip makanan/minuman khas lokal Sokaraja & Banyumas (Getuk Goreng Tohirin, Soto Kecik, Tempe Mendoan, Nopia, Jenang Jaket).

---

## 🎨 Fitur Utama & Desain Sistem

- **Earth-Tone Modern Palette:**
  - Primary (Hijau Herbal): `#2D5A27`
  - Secondary (Terracotta): `#C86D51`
  - Background (Off-White Hangat): `#FAF8F5`
  - Text & Accents: `#1C2826`, `#5C6B66`, `#E2E8F0`
- **Tipografi:** Google Fonts *Plus Jakarta Sans* & *Inter*.
- **Pemesanan Direct WhatsApp Frictionless:**
  - Format pesan WhatsApp otomatis untuk pembelian reguler per produk.
  - Format pesan WhatsApp otomatis untuk request formulir Jastip Kuliner.
  - Keranjang belanja multi-item untuk memesan beberapa produk sekaligus dalam 1 pesan WhatsApp.
- **Product Detail Modal (PDP):**
  - Galeri carousel foto multi-sudut.
  - Dimensi/ukuran spesifikasi produk.
  - Safety & Quality Assurance Badge (🛡️ Packing Kayu / Extra Bubble Wrap Aman, 🌱 Garansi Bibit Segar, 🌿 100% Produk HNI Resmi & BPOM).
  - Selector varian & kuantitas.
- **Integrasi Lokasi Google Maps:**
  - Tautan langsung ke lokasi fisik toko: [📍 Google Maps Stokis HPAI Daryani](https://maps.app.goo.gl/emb88QRXfsrzxLJV7).

---

## 🚀 Menjalankan Secara Lokal

```bash
# Install dependensi
npm install

# Jalankan server pengembangan
npm run dev

# Buka di browser
http://localhost:5173
```

---

## ⚙️ Konfigurasi Toko & Kontak

Semua data kontak, alamat, jam buka, dan nomor WhatsApp admin dapat diatur di satu file:
👉 [`src/data/storeConfig.js`](src/data/storeConfig.js)

```javascript
export const STORE_CONFIG = {
  name: "Warung Serba Alami & Stokis Daryani",
  whatsappNumber: "6285227189199", // Ganti dengan nomor WhatsApp aktif
  mapsUrl: "https://maps.app.goo.gl/emb88QRXfsrzxLJV7",
  openingHours: "Setiap Hari: 07.30 - 20.00 WIB",
  // ...
};
```

Untuk menambah atau mengedit produk, buka:
👉 [`src/data/products.json`](src/data/products.json)

---

## 📦 Deployment ke Vercel

Proyek ini telah dikonfigurasi dan dioptimasi untuk deployment cepat ke **Vercel**:
1. Push repository ke GitHub.
2. Buka dashboard [Vercel](https://vercel.com) & klik **Add New Project**.
3. Pilih repository ini dan klik **Deploy**.
