'use client';

import { CHAT } from '@/config/site';

export default function ChatHub() {
  const whatsapp = CHAT.channels.find((c) => c.type === 'whatsapp');
  if (!whatsapp) return null;

  return (
    <a
      className="chat-fab"
      href={`https://wa.me/${whatsapp.value}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11a16.5 16.5 0 0 1-1.6-.6c-2.82-1.22-4.66-4.06-4.8-4.25-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.03.63.48.24.55.8 1.9.87 2.04.07.14.11.3.02.49-.09.19-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.17-.19.7-.81.89-1.09.19-.28.37-.23.63-.14.26.09 1.64.77 1.92.91.28.14.47.21.53.33.07.12.07.7-.17 1.38Z" />
      </svg>
    </a>
  );
}
