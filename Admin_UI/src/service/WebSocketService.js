import * as signalR from '@microsoft/signalr';

const VITE_SIGNALR_URL = import.meta.env.VITE_SIGNALR_URL;
console.log('VITE_SIGNALR_URL', VITE_SIGNALR_URL);
class WebSocketService {
  constructor() {
    this.hubUrl = VITE_SIGNALR_URL;
    this.connection = null;
    this.eventHandlers = {};
  }
  async start() {
    if (this.connection) return;
    this.connection = new signalR.HubConnectionBuilder().withUrl(this.hubUrl).withAutomaticReconnect().build();
    this.connection.onclose((error) => {
      console.warn('SignalR connection closed', error);
    });

    this.connection.onreconnecting((error) => {
      console.warn('SignalR reconnecting', error);
    });

    this.connection.onreconnected((connectId) => {
      console.info('SignalR reconnected', connectionId);
    });

    for (const [method, callback] of Object.entries(this.eventHandlers)) {
      this.connection.on(method, callback);
    }
    try {
      await this.connection.start();
      console.log('SignalR connected');
    } catch (err) {
      console.log('SignalR connect error', err);
      setTimeout(() => this.start(), 5000);
    }
  }
  async send(method, ...args) {
    if (!this.connection || this.connection.state !== 'Connected') {
      console.warn('SignalR not connected yet');
      return;
    }
    try {
      await this.connection.invoke(method, ...args);
    } catch (err) {
      console.error(`Error calling ${method}:`, err);
    }
  }

  on(method, callback) {
    this.eventHandlers[method] = callback;
    if (this.connection) {
      this.connection.on(method, callback);
    }
  }

  off(method) {
    delete this.eventHandlers[method];
    if (this.connection) {
      this.connection.off(method);
    }
  }
  async stop() {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }
}

export default WebSocketService;
