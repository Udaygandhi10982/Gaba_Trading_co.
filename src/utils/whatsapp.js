// ─── CENTRALIZED BUSINESS WHATSAPP NUMBER ────────────────────────────────────
// Format: country code + number, no spaces / + / brackets / hyphens
export const BUSINESS_WHATSAPP_NUMBER = "918360774127";

// ─── MESSAGE GENERATOR ────────────────────────────────────────────────────────
export function generateWhatsAppMessage(cartItems, customerInfo = {}) {
  const { name = '', phone = '', address = '', notes = '' } = customerInfo;

  // Build numbered item lines
  const itemLines = cartItems.map((item, i) => {
    const num = i + 1;
    if (item.price != null) {
      const subtotal = item.price * item.quantity;
      return (
        `${num}. ${item.name}\n` +
        `   Quantity: ${item.quantity} ${item.unit}\n` +
        `   Price: \u20B9${item.price} / ${item.unit}\n` +
        `   Subtotal: \u20B9${subtotal.toLocaleString('en-IN')}`
      );
    } else {
      return (
        `${num}. ${item.name}\n` +
        `   Quantity: ${item.quantity} ${item.unit}\n` +
        `   Price: Ask for Price`
      );
    }
  }).join('\n\n');

  // Total calculation — only known-price items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const knownTotal = cartItems.reduce((sum, item) => {
    return item.price != null ? sum + item.price * item.quantity : sum;
  }, 0);
  const hasAskForPrice = cartItems.some(item => item.price == null);

  const totalLine = knownTotal > 0
    ? `\u20B9${knownTotal.toLocaleString('en-IN')}`
    : 'Ask for Price';

  const askForPriceNote = hasAskForPrice && knownTotal > 0
    ? '\n*Some products are listed as Ask for Price. Final pricing will be confirmed on WhatsApp.*'
    : hasAskForPrice
    ? '\n*Final pricing will be confirmed on WhatsApp.*'
    : '';

  // Customer details block
  const customerBlock = [
    `Name: ${name || '(not provided)'}`,
    `Phone: ${phone || '(not provided)'}`,
    `Address: ${address || '(not provided)'}`,
  ].join('\n');

  const notesBlock = notes ? notes.trim() : 'Please confirm availability and final pricing.';

  const separator = '------------------------------';

  const message =
    `Hello GABA BUILDING MATERIAL,\n\n` +
    `I would like to place an order for the following materials:\n\n` +
    `${itemLines}\n\n` +
    `${separator}\n` +
    `Total Items: ${totalItems}\n` +
    `Estimated Total: ${totalLine}\n` +
    `${separator}${askForPriceNote}\n\n` +
    `Customer Details:\n\n` +
    `${customerBlock}\n\n` +
    `Additional Notes:\n${notesBlock}\n\n` +
    `Thank you.`;

  return `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
