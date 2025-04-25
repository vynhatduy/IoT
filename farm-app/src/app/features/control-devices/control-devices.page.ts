import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IonRefresher } from '@ionic/angular';
import { v4 as uuid } from 'uuid';

interface DeviceItem {
  key: string;
  label: string;
  icon: string;
}
interface DeviceDetail {
  [key: string]: boolean;
}
@Component({
  selector: 'app-control-devices',
  templateUrl: './control-devices.page.html',
  styleUrls: ['./control-devices.page.scss'],
})
export class ControlDevicesPage implements OnInit {
  @ViewChild(IonRefresher) refresher!: IonRefresher;

  sensorLocationId: string = '';
  areas: any[] = [];
  sensorData: any = null;
  errorMessage: string = '';
  loading: boolean = false;
  pendingDeviceStatus: { [deviceId: string]: { [key: string]: boolean } } = {};
  warning: string = '';
  deviceList: DeviceItem[] = [
    { key: 'light', label: 'Đèn', icon: 'assets/icon/light.png' },
    { key: 'fan', label: 'Quạt', icon: 'assets/icon/fan.png' },
    { key: 'pump', label: 'Máy bơm', icon: 'assets/icon/water-pump.png' },
    { key: 'heater', label: 'Máy sưởi', icon: 'assets/icon/water-heater.png' },
  ];

  deviceStatus: { [key: string]: boolean } = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAreas();
  }

  fetchAreas() {
    this.http.get<any[]>(`${environment.be_api}/area`).subscribe(
      (data) => (this.areas = data),
      (error) => {
        console.error('Lỗi lấy danh sách khu vực:', error);
        this.errorMessage = 'Không thể tải danh sách khu vực!';
      }
    );
  }

  async onLocationChange(areaId: string) {
    this.sensorLocationId = areaId;
    this.sensorData = null;
    this.errorMessage = '';
    await this.loadData();
  }

  async loadData() {
    if (!this.sensorLocationId) return;

    this.loading = true;
    try {
      const response = await this.http
        .get<any>(`${environment.be_api}/areaDevice/by-area`, {
          params: new HttpParams().set('areaId', this.sensorLocationId),
        })
        .toPromise();

      this.sensorData = response;
      // Gộp trạng thái thiết bị vào `deviceStatus`
      this.deviceStatus = {};
      this.sensorData[0]?.deviceDetails?.forEach((device: any) => {
        this.deviceStatus[device.id] = device.details?.[0] || {};
      });
      console.log(this.sensorData);
    } catch (error) {
      console.error('Lỗi tải dữ liệu thiết bị:', error);
      this.sensorData = null;
      this.errorMessage = 'Không thể tải dữ liệu từ máy chủ!';
    } finally {
      this.loading = false;
    }
  }
  getAreaName(areaId: string): string {
    const area = this.areas.find((a) => a.id === areaId);
    return area ? area.name : 'Không xác định';
  }

  toggleDevice(deviceId: string, deviceKey: string, newStatus: boolean) {
    if (!this.pendingDeviceStatus[deviceId]) {
      this.pendingDeviceStatus[deviceId] = {};
    }
    this.pendingDeviceStatus[deviceId][deviceKey] = newStatus;
  }

  doRefresh(event: any) {
    if (this.sensorLocationId) {
      this.loadData().finally(() => event.target.complete());
    } else {
      event.target.complete();
    }
  }

  getIconForDevice(key: string): string {
    const icons: { [key: string]: string } = {
      light: 'assets/icons/light.png',
      fan: 'assets/icons/fan.png',
      pump: 'assets/icons/water-pump.png',
      heater: 'assets/icons/water-heater.png',
    };
    return icons[key] || 'assets/icons/default.png';
  }

  getSelectedAreaName(): string {
    if (!this.sensorLocationId) return '';
    const selectedArea = this.areas.find(
      (area) => area.id === this.sensorLocationId
    );
    return selectedArea ? selectedArea.name : '';
  }
  getSelectedAreaId(): string {
    if (!this.sensorLocationId) return '';
    const selectedArea = this.areas.find(
      (area) => area.id === this.sensorLocationId
    );
    return selectedArea ? selectedArea.id : '';
  }

  async sendDeviceData(device: any) {
    const deviceDetails = device.details?.[0] || {};
    const deviceId = device.id;

    const supportedKeys = ['light', 'fan', 'pump', 'heater'];
    const payload: any = {
      deviceId: device.name,
      area: this.getSelectedAreaId(),
    };

    let hasChanges = false;

    for (const key of supportedKeys) {
      const pending = this.pendingDeviceStatus[deviceId]?.[key];
      const current = deviceDetails?.[key];

      if (pending !== undefined) {
        const value = pending ? 1 : 0;
        const currentValue = current ? 1 : 0;

        if (value !== currentValue) {
          // Nếu có thay đổi → dùng pending
          payload[key] = value;
          hasChanges = true;
        } else {
          // Nếu giống nhau → dùng current
          payload[key] = currentValue;
        }
      } else if (current !== undefined) {
        // Nếu không có pending → giữ nguyên current
        payload[key] = current ? 1 : 0;
      }
    }

    if (hasChanges) {
      try {
        const response = await this.http
          .post<any>(`${environment.be_api}/device/control`, payload, {
            headers: { 'Content-Type': 'application/json' },
          })
          .toPromise();

        console.log('Phản hồi từ backend:', response);
        this.warning = ''; // Xóa cảnh báo nếu gửi thành công
        this.loadData();
      } catch (error) {
        console.error('Lỗi khi gửi dữ liệu thiết bị:', error);
        this.errorMessage = 'Không thể gửi dữ liệu!';
      }
    } else {
      this.warning = 'Vui lòng bật hoặc tắt thiết bị để thực hiện thay đổi!';
    }
  }

  getDefaultSensorData() {
    return {
      temperature: 0,
      humidity: 0,
      light: 0,
      airQuality: 0,
    };
  }
}
