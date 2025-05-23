import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  sensorData: any;
  loading: boolean = true;
  errorMessage: string = '';
  sensorLocation: string = '';
  areas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAreas();
  }

  // Thêm hàm doRefresh ở đây
  doRefresh(event: any) {
    console.log('Begin async operation');
    this.fetchSensorData();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  fetchSensorData() {
    this.loading = true;
    this.errorMessage = '';
    const params = new HttpParams().set('area', this.sensorLocation ?? 'KV001');

    this.http
      .get<any>(`${environment.be_api}/environment/latest`, { params })
      .subscribe(
        (data) => {
          this.sensorData = data;
          this.errorMessage = '';
          this.loading = false;
        },
        (error) => {
          console.error('Lỗi lấy dữ liệu cảm biến:', error);
          this.sensorData = this.getDefaultSensorData();
          this.errorMessage = 'Không thể lấy dữ liệu từ máy chủ!';
          this.loading = false;
        }
      );
  }
  fetchAreas() {
    this.http.get<any[]>(`${environment.be_api}/area`).subscribe(
      (data) => {
        this.areas = data;
        if (this.areas.length > 0) {
          this.sensorLocation = this.areas[0].name;
          this.fetchSensorData();
        }
      },
      (error) => {
        console.error('Lỗi lấy danh sách khu vực:', error);
        this.errorMessage = 'Không thể tải danh sách khu vực!';
      }
    );
  }
  onSensorLocationChange(event: any) {
    this.sensorLocation = event.detail.value;
    console.log('New sensor location:', this.sensorLocation);
    this.fetchSensorData();
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
