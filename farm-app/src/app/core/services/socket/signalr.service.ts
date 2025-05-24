import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubUrl: string = environment.signalRUrl;
  private connection: signalR.HubConnection | null = null;
  private eventHandlers: { [method: string]: (...args: any[]) => void } = {};
  constructor() {}
  async start(): Promise<void> {
    if (this.connection) return;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .withAutomaticReconnect()
      .build();

    this.connection.onclose((error) => {
      console.warn('SignalR connection closed', error);
    });
    this.connection.onreconnecting((error) => {
      console.warn('SignalR reconnecting', error);
    });

    this.connection.onreconnected((connectionId) => {
      console.info('SignalR reconnected', connectionId);
    });
    // Gắn tất cả các event đã đăng ký trước đó
    for (const [method, callback] of Object.entries(this.eventHandlers)) {
      this.connection.on(method, callback);
    }

    try {
      await this.connection.start();
      console.log('SignalR connected');
    } catch (err) {
      console.error('SignalR connect error', err);
      setTimeout(() => this.start(), 5000);
    }
  }
  on(method: string, callback: (...args: any[]) => void): void {
    this.eventHandlers[method] = callback;
    if (this.connection) {
      this.connection.on(method, callback);
    }
  }

  off(method: string): void {
    delete this.eventHandlers[method];
    if (this.connection) {
      this.connection.off(method);
    }
  }
  async send(method: string, ...args: any[]): Promise<void> {
    if (
      !this.connection ||
      this.connection.state !== signalR.HubConnectionState.Connected
    ) {
      console.warn('SignalR not connected yet');
      return;
    }
    try {
      await this.connection.invoke(method, ...args);
    } catch (err) {
      console.error(`Error calling ${method}:`, err);
    }
  }

  async stop(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }
}
