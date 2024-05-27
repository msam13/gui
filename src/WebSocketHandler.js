// src/WebSocketHandler.js
export const initializeWebSocket = (url, onOpen, onMessage, onClose, onError) => {
    const ws = new WebSocket(url);
  
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
    ws.onclose = onClose;
    ws.onerror = onError;
  
    return ws;
  };
  