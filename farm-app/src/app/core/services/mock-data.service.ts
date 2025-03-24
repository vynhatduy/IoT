import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import environments from '../../../assets/mock-data/environment.json';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor(private http: HttpClient) {}

  // Lấy dữ liệu farms từ file JSON
  getFarmsData(): Observable<any> {
    return this.http.get('../../../assets/mock-data/farms.json').pipe(
      catchError((error) => {
        console.error('Error loading mock farms data:', error);
        return of([]);
      })
    );
  }

  // Lấy dữ liệu môi trường cho ngày cụ thể từ file JSON
  getEnvironmentData(sensorLocation: string, date: string): Observable<any> {
    return this.http.get('../../../assets/mock-data/environment.json').pipe(
      map((data: any) => {
        if (data[sensorLocation] && data[sensorLocation][date]) {
          return data[sensorLocation][date];
        }
        console.warn(`No data found for ${sensorLocation} on ${date}`);
        return [];
      }),
      catchError((error) => {
        console.error('Error loading mock environment data:', error);
        return of([]);
      })
    );
  }
}
