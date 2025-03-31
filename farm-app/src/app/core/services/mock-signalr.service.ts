import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockSignalRService {
  private connections = new Map<string, BehaviorSubject<any>>();
  private defaultDeviceStatus = {
    Status: [false, false, false, false],
  };

  constructor() {
    // Tạo trạng thái mặc định cho từng khu vực
    this.connections.set(
      'kv1_status',
      new BehaviorSubject({
        Status: [false, false, false, false],
      })
    );
    this.connections.set(
      'kv2_status',
      new BehaviorSubject({
        Status: [false, false, false, false],
      })
    );
    this.connections.set(
      'kv3_status',
      new BehaviorSubject({
        Status: [false, false, false, false],
      })
    );
  }

  // Giả lập phương thức on của SignalR
  on(channel: string, callback: (data: any) => void): any {
    if (!this.connections.has(channel)) {
      this.connections.set(
        channel,
        new BehaviorSubject(this.defaultDeviceStatus)
      );
    }

    const subject = this.connections.get(channel);
    if (subject) {
      subject.subscribe((data) => {
        callback(JSON.stringify(data));
      });
    }

    return this;
  }

  // Giả lập phương thức start của SignalR
  start(): Promise<void> {
    console.log('Mock SignalR connection started');
    return Promise.resolve();
  }

  // Giả lập phương thức stop của SignalR
  stop(): Promise<void> {
    console.log('Mock SignalR connection stopped');
    return Promise.resolve();
  }

  // Phương thức để cập nhật trạng thái thiết bị
  updateDeviceStatus(
    channel: string,
    deviceIndex: number,
    status: boolean
  ): void {
    const subject = this.connections.get(channel);
    if (subject) {
      const currentData = subject.value;
      currentData.Status[deviceIndex] = status;
      subject.next({ ...currentData });
    }
  }
}
