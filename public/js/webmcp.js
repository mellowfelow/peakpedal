(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;

  navigator.modelContext.provideContext({
    tools: [
      {
        name: 'browse_products',
        description: 'Browse electric mountain bikes by category or brand',
        inputSchema: { type: 'object', properties: { category: { type: 'string', description: 'Category or brand slug' } } },
        execute: async ({ category }) => {
          const url = category ? `https://DOMAIN.com/${category}/` : `https://DOMAIN.com/electric-mountain-bikes/`;
          window.location.href = url;
          return { url };
        },
      },
      {
        name: 'order_via_whatsapp',
        description: 'Start an order via WhatsApp. Free UK delivery, no minimum order.',
        inputSchema: { type: 'object', properties: { message: { type: 'string', description: 'Pre-filled order message' } } },
        execute: async ({ message }) => {
          const url = message
            ? `https://wa.me/440000000000?text=${encodeURIComponent(message)}`
            : `https://wa.me/440000000000`;
          window.open(url, '_blank');
          return { url };
        },
      },
      {
        name: 'get_finance_info',
        description: 'Get finance and Cycle to Work scheme information',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => {
          window.location.href = 'https://DOMAIN.com/finance/';
          return { url: 'https://DOMAIN.com/finance/' };
        },
      },
      {
        name: 'contact',
        description: 'Contact for product questions or support',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => {
          window.location.href = 'https://DOMAIN.com/contact/';
          return { url: 'https://DOMAIN.com/contact/' };
        },
      },
    ],
  });
})();
