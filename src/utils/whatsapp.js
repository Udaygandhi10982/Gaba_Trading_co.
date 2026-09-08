// ─── CENTRALIZED BUSINESS WHATSAPP NUMBER ────────────────────────────────────
// Format: country code + number, no spaces / + / brackets / hyphens
export const BUSINESS_WHATSAPP_NUMBER = "919592959541";

// ─── MESSAGE GENERATOR ────────────────────────────────────────────────────────
export function generateWhatsAppMessage(cartItems, customerInfo = {}) {
  const { name = '', phone = '', address = '', notes = '' } = customerInfo;

  // Build numbered item lines with Code & Packet Option
  const itemLines = cartItems.map((item, i) => {
    const num = i + 1;
    const codeTag = item.code ? ` (Code: ${item.code})` : '';
    const packetTag = item.selectedPacket ? `\n   Packing/Packet: ${item.selectedPacket}` : '';

    if (item.price != null) {
      const subtotal = item.price * item.quantity;
      return (
        `${num}. ${item.name}${codeTag}` +
        `${packetTag}` +
        `\n   Quantity: ${item.quantity} ${item.unit || 'Piece'}` +
        `\n   Price: ₹${item.price} / ${item.unit || 'Piece'}` +
        `\n   Subtotal: ₹${subtotal.toLocaleString('en-IN')}`
      );
    } else {
      return (
        `${num}. ${item.name}${codeTag}` +
        `${packetTag}` +
        `\n   Quantity: ${item.quantity} ${item.unit || 'Piece'}` +
        `\n   Price: Wholesale Inquiry`
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
    ? `₹${knownTotal.toLocaleString('en-IN')}`
    : 'Wholesale Inquiry';

  const askForPriceNote = hasAskForPrice && knownTotal > 0
    ? '\n*Some items are listed for custom wholesale quotation. Final pricing will be confirmed on WhatsApp.*'
    : hasAskForPrice
    ? '\n*Final bulk pricing will be confirmed on WhatsApp.*'
    : '';

  // Customer details block
  const customerBlock = [
    `Name: ${name || '(not provided)'}`,
    `Phone: ${phone || '(not provided)'}`,
    `Address: ${address || '(not provided)'}`,
  ].join('\n');

  const notesBlock = notes ? notes.trim() : 'Please confirm stock availability and bulk rates.';

  const separator = '------------------------------';

  const message =
    `Hello GABA Trading Co.,\n\n` +
    `I would like to place an order / inquiry for the following sanitary products:\n\n` +
    `${itemLines}\n\n` +
    `${separator}\n` +
    `Total Items: ${totalItems}\n` +
    `Estimated Total: ${totalLine}\n` +
    `${separator}${askForPriceNote}\n\n` +
    `Customer Details:\n` +
    `${customerBlock}\n\n` +
    `Additional Notes:\n${notesBlock}\n\n` +
    `Thank you.`;

  return `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
