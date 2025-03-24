import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  sensorData: any;
  loading: boolean = true;
  sensorLocation: string = 'KV001'; // Default location

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchSensorData();
  }

  fetchSensorData() {
    this.loading = true;
    this.http.get<any>(`${environment.api_url}/environment/latest`).subscribe(
      (data) => {
        this.sensorData = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    );
  }

  onSensorLocationChange(event: any) {
    this.sensorLocation = event.detail.value;
    console.log('New sensor location:', this.sensorLocation);
    this.fetchSensorData(); // Fetch data again when sensor location changes
  }
}
