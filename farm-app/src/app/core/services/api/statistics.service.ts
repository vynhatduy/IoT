import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import axios from 'axios';
import { MockDataService } from '../mock-data.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  API_URL: string = environment.api_url;
  useMockData: boolean = environment.useMockData;

  constructor(private mockDataService: MockDataService) {}

  getSpecifiedDateData(sensorLocation: string, date: string): Promise<any> {
    if (this.useMockData) {
      // Sử dụng dữ liệu mẫu
      return from(this.mockDataService.getEnvironmentData(sensorLocation, date))
        .toPromise()
        .then((data) => data)
        .catch((error) => {
          console.error('Error fetching mock data:', error);
          throw error;
        });
    } else {
      // Sử dụng API thật
      return axios
        .get(
          `${this.API_URL}/environments/specifieddate?sensorLocation=${sensorLocation}&date=${date}`
        )
        .then((response) => response.data)
        .catch((error) => {
          console.error(error);
          throw error;
        });
    }
  }

  // Phương thức mới: lấy cấu hình ngưỡng an toàn
  getSafeThresholds(): Promise<any> {
    if (this.useMockData) {
      // Trả về dữ liệu ngưỡng mẫu
      return Promise.resolve({
        temperature: { min: 18, max: 28 },
        humidity: { min: 30, max: 70 },
        airQuality: { min: 0, max: 50 },
      });
    } else {
      // Sử dụng API thật để lấy cấu hình ngưỡng
      return axios
        .get(`${this.API_URL}/environments/thresholds`)
        .then((response) => response.data)
        .catch((error) => {
          console.error(error);
          // Trả về giá trị mặc định nếu không lấy được từ API
          return {
            temperature: { min: 18, max: 28 },
            humidity: { min: 30, max: 70 },
            airQuality: { min: 0, max: 50 },
          };
        });
    }
  }

  // Phương thức thêm cảnh báo mới
  addAlert(alertData: any): Promise<any> {
    if (this.useMockData) {
      // Giả lập thêm cảnh báo thành công
      console.log('Mock alert added:', alertData);
      return Promise.resolve({ success: true });
    } else {
      // Sử dụng API thật để thêm cảnh báo
      return axios
        .post(`${this.API_URL}/alerts`, alertData)
        .then((response) => response.data)
        .catch((error) => {
          console.error(error);
          throw error;
        });
    }
  }
}
