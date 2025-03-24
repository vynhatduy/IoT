import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import axios from 'axios';
import { MockDataService } from '../mock-data.service';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  API_URL: string = environment.api_url;
  useMockData: boolean = true; // Thêm flag để chuyển đổi giữa API thật và dữ liệu mẫu

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
}
