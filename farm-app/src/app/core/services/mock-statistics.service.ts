import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataTypeEnum from '../../models/enums/DataTypeEnum';

@Injectable({
  providedIn: 'root',
})
export class MockStatisticsService {
  private mockData: any = null;

  constructor(private http: HttpClient) {}

  async loadMockData(): Promise<any> {
    if (!this.mockData) {
      this.mockData = await this.http
        .get('./assets/mock-data/statistics.json')
        .toPromise();
    }
    return this.mockData;
  }

  async getSpecifiedDateData(location: string, date: string): Promise<any[]> {
    // Đảm bảo dữ liệu được tải
    await this.loadMockData();

    // Lấy dữ liệu từ file mock
    const data = this.mockData.data;

    // Chỉ trả về dữ liệu phù hợp với location
    const filteredData = data.filter((item: any) => item.sensorId === location);

    // Nếu date là ngày hiện tại, trả về tất cả dữ liệu mẫu
    // Nếu là ngày khác, trả về mảng rỗng để giả lập không có dữ liệu
    const today = new Date().toISOString().split('T')[0];

    if (date === today) {
      return filteredData;
    } else {
      return [];
    }
  }
}
