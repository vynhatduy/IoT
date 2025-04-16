import { Component, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IonRefresher } from '@ionic/angular';
import * as signalR from '@microsoft/signalr';
import { MockSignalRService } from '../../core/services/mock-signalr.service';

@Component({
  selector: 'app-control-devices',
  templateUrl: './control-devices.page.html',
  styleUrls: ['./control-devices.page.scss'],
})
export class ControlDevicesPage implements OnInit {
  @ViewChild(IonRefresher) refresher!: IonRefresher;

  sensorLocation: string = '1';
  locations: any;
  deviceStatusCode: any;
  fetchDataCompleted = false;
  sensorData: any = { Status: [] };
  connection: signalR.HubConnection | null = null;
  mockSignalRService: MockSignalRService | null = null;
  useMockData = environment.useMockData;

  constructor(
    private http: HttpClient,
    private mockSignalR: MockSignalRService
  ) {
    this.mockSignalRService = mockSignalR;
  }

  ngOnInit() {
    this.loadData().then(() => {
      if (this.useMockData) {
        this.connectMockSignalR();
      } else {
        this.connectSignalR();
      }
    });
  }

  async loadData() {
    try {
      if (this.useMockData) {
        // Use sample data
        const response = await this.http
          .get('./assets/mock-data/control-devices.json')
          .toPromise();
        this.locations = (response as any).results[this.sensorLocation];
        this.deviceStatusCode = (response as any).results[
          this.sensorLocation
        ].deviceStatusCode;
      } else {
        // Use real API
        const response = await axios.get(`${environment.api_url}/farms`);
        this.locations = response.data.results[this.sensorLocation];
        this.deviceStatusCode =
          response.data.results[this.sensorLocation].deviceStatusCode;
      }
      this.fetchDataCompleted = true;
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  // Connect to mock SignalR when using sample data
  connectMockSignalR() {
    if (!this.fetchDataCompleted || !this.mockSignalRService) return;

    this.mockSignalRService.on(this.deviceStatusCode ?? '', (dataString) => {
      try {
        const data = JSON.parse(dataString);
        console.log('Mock SignalR data:', data);
        this.sensorData = data;
      } catch (error) {
        console.error('Error parsing mock data string:', error);
      }
    });

    console.log('Mock SignalR connected!');
  }

  // Connect to real SignalR
  async connectSignalR() {
    if (!this.fetchDataCompleted || this.useMockData) return;
    try {
      const connect = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.base_url}/farmhub`)
        .withAutomaticReconnect()
        .build();

      await connect.on(this.deviceStatusCode ?? '', (dataString) => {
        try {
          const data = JSON.parse(dataString);
          console.log('Parsed data:', data);
          this.sensorData = data;
        } catch (error) {
          console.error('Error parsing JSON string:', error);
        }
      });

      await connect.start();
      console.log('Connected!');
      this.connection = connect;
      return () => {
        connect.stop();
      };
    } catch (err) {
      console.error('Error while establishing connection:', err);
      return;
    }
  }

  doRefresh(event: any) {
    this.loadData().then(() => {
      if (this.useMockData) {
        this.connectMockSignalR();
      } else {
        this.connectSignalR();
      }
    });

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  async controlDevice(device: any, statusDevice: boolean) {
    if (this.useMockData) {
      // Handle with sample data
      console.log(
        `Controlling device ${device.id} (${device.name}): set to ${statusDevice}`
      );

      // Update device status in mock service
      if (this.mockSignalRService && this.deviceStatusCode) {
        this.mockSignalRService.updateDeviceStatus(
          this.deviceStatusCode,
          device.order,
          statusDevice
        );
      }

      return;
    }

    // Handle with real API
    const postData = {
      topicName: device.controllerCode,
      payload: {
        id: device.id,
        status: statusDevice,
        order: device.order,
      },
    };

    await axios
      .post(`${environment.api_url}/controldevices`, postData)
      .then((response) => {})
      .catch((error) => {
        console.error('Error controlling device:', error);
      });
  }

  // select sensorLocation => ex: kv2
  onSensorLocationChange(event: any) {
    this.sensorLocation = event.detail.value;
    // Removed call to undefined method 'loadEnvironmentData'
    this.loadData().then(() => {
      if (this.useMockData) {
        this.connectMockSignalR();
      } else {
        this.connectSignalR();
      }
    });
  }
}
