import { STORE_CONFIG } from "../data/storeConfig";

/**
 * Creates WhatsApp URL for single product order matching design specification
 * 
 * Format:
 * Halo Admin Stokis Daryani, saya mau pesan:
 * - Produk: [Nama Produk]
 * - Varian/Ukuran: [Jika Ada]
 * - Jumlah: [Jumlah]
 * 
 * Mohon info ketersediaan stok dan total ongkirnya, terima kasih.
 */
export function createProductOrderUrl({ product, variant = "", quantity = 1 }) {
  const phone = STORE_CONFIG.whatsappNumber;
  const variantText = variant && variant.trim().length > 0 ? variant : "-";

  const message = `Halo Admin Stokis Daryani, saya mau pesan:
- Produk: ${product.name}
- Varian/Ukuran: ${variantText}
- Jumlah: ${quantity}

Mohon info ketersediaan stok dan total ongkirnya, terima kasih.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates WhatsApp URL for Jastip Kuliner matching design specification
 * 
 * Format:
 * Halo Admin Stokis Daryani, saya mau titip makanan/minuman:
 * - Nama Pemesan: [Nama]
 * - Pesanan & Toko Asal: [Detail Pesanan]
 * - Alamat Kirim: [Alamat/Kecamatan]
 * - Catatan: [Catatan]
 * 
 * Mohon konfirmasi slot dan estimasi biayanya, terima kasih.
 */
export function createJastipOrderUrl({ name, orderDetails, address, notes = "" }) {
  const phone = STORE_CONFIG.whatsappNumber;
  const notesText = notes && notes.trim().length > 0 ? notes : "-";

  const message = `Halo Admin Stokis Daryani, saya mau titip makanan/minuman:
- Nama Pemesan: ${name}
- Pesanan & Toko Asal: ${orderDetails}
- Alamat Kirim: ${address}
- Catatan: ${notesText}

Mohon konfirmasi slot dan estimasi biayanya, terima kasih.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates WhatsApp URL for multi-item cart checkout
 */
export function createCartOrderUrl(cartItems) {
  const phone = STORE_CONFIG.whatsappNumber;
  
  const itemsText = cartItems
    .map((item, index) => {
      const variantStr = item.selectedVariant ? ` (${item.selectedVariant})` : "";
      const subtotal = (item.price * item.quantity).toLocaleString("id-ID");
      return `${index + 1}. ${item.name}${variantStr}\n   Jumlah: ${item.quantity} x Rp ${item.price.toLocaleString("id-ID")} = Rp ${subtotal}`;
    })
    .join("\n\n");

  const grandTotal = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toLocaleString("id-ID");

  const message = `Halo Admin Stokis Daryani, saya mau pesan beberapa produk sekaligus:

${itemsText}

--------------------------
*Perkiraan Total: Rp ${grandTotal}*

Mohon konfirmasi ketersediaan stok dan hitungan ongkirnya ke alamat saya ya. Terima kasih!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * General consultation link to Admin WhatsApp
 */
export function createGeneralConsultUrl(customText = "") {
  const phone = STORE_CONFIG.whatsappNumber;
  const defaultText = `Halo Admin Stokis Daryani, saya ingin bertanya seputar produk herbal HNI, gerabah, bibit tanaman, atau jastip di toko Anda.`;
  const message = customText || defaultText;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
