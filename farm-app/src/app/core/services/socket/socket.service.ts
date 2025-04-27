import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private connection?: HubConnection;

  setConnection(connection: HubConnection) {
    this.connection = connection;
  }

  toggleDevice(
    uid: string,
    deviceId: string,
    deviceName: string,
    state: boolean
  ): void {
    if (this.connection) {
      this.connection.invoke('ControlDevice', {
        uid,
        deviceId,
        deviceName,
        state,
      });
    }
  }

  onDeviceStateUpdate(callback: (response: any) => void): void {
    this.connection?.on('control-device-update', callback);
  }

  offDeviceStateUpdate(): void {
    this.connection?.off('control-device-update');
  }

  disconnect(): void {
    this.connection?.stop();
  }
}
