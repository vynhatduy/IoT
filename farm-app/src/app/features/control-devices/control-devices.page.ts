import { Component, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment.prod';
import { IonRefresher } from '@ionic/angular';
import * as signalR from '@microsoft/signalr';

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

  constructor() {}

  ngOnInit() {
    this.loadData().then(() => {
      this.connectSignalR();
    });
  }

  async loadData() {
    try {
      const response = await axios.get(`${environment.api_url}/farms`);
      this.locations = response.data.results[this.sensorLocation];
      this.deviceStatusCode =
        response.data.results[this.sensorLocation].deviceStatusCode;
      this.fetchDataCompleted = true;
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  async connectSignalR() {
    if (!this.fetchDataCompleted) return;
    try {
      const connect = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.base_url}/farmhub`)
        .withAutomaticReconnect()
        .build();

      //  esp8266/ledStatus
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
    this.loadData();

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  async controlDevice(device: any, statusDevice: boolean) {
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
    console.log(this.sensorLocation);
  }
}
