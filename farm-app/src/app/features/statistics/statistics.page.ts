import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { StatisticsService } from '../../core/services/api/statistics.service';
import DataTypeEnum from '../../models/enums/DataTypeEnum';
import { environment } from '../../../environments/environment';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  @ViewChild('forecastChart') forecastChart!: ElementRef;

  currentDate!: string;
  environmentData!: any;
  forecastData: any[] = [];
  forecastChartObj!: Chart;
  useMockData = environment.useMockData;

  sensorLocation: string = '2'; // Mặc định là KV2 (giống như trong control-devices)
  getSelectedAreaText(): string {
    // Tìm text tương ứng với sensorLocation từ mảng locations
    const selectedLocation = this.locations.find(
      (loc) => loc.value === this.sensorLocation
    );
    return selectedLocation ? selectedLocation.text : 'KV2';
  }

  locations: any[] = [
    { value: '1', text: 'KV1' },
    { value: '2', text: 'KV2' },
    { value: '3', text: 'KV3' },
  ];
  // Chọn khu vực
  selectedArea: string = 'KV2'; // Giá trị mặc định là KV2
  availableAreas: string[] = ['KV1', 'KV2', 'KV3']; // Danh sách các khu vực có sẵn

  // Cảnh báo hệ thống
  alerts: any[] = [];

  // Dự đoán xu hướng
  selectedForecastType: string = 'temperature';
  forecastAnalysis: string = '';

  // Phân tích rủi ro
  risks: any[] = [];

  // Ngưỡng an toàn
  safeThresholds = {
    temperature: { min: 18, max: 28 },
    humidity: { min: 30, max: 70 },
    airQuality: { min: 0, max: 50 },
  };

  constructor(
    private statisticsService: StatisticsService,
    private alertController: AlertController,
    private modalController: ModalController,
    private http: HttpClient
  ) {}

  ngAfterViewInit() {
    this.initializeCharts();
  }

  ngOnInit() {
    this.currentDate = this.getCurrentDate();
    this.loadEnvironmentData(this.currentDate);
  }

  // Xử lý khi có thay đổi khu vực
  areaChanged(event: CustomEvent) {
    this.selectedArea = event.detail.value;
    this.loadEnvironmentData(this.currentDate);
  }

  // Hàm chuyển đổi string thành DataTypeEnum
  getAreaEnum(area: string): any {
    // Hoặc sử dụng kiểu trả về chính xác nếu biết
    switch (area) {
      case 'KV1':
        return DataTypeEnum.SENSORLOCATION.KV1;
      case 'KV2':
        return DataTypeEnum.SENSORLOCATION.KV2;
      case 'KV3':
        return DataTypeEnum.SENSORLOCATION.KV3;
      default:
        return DataTypeEnum.SENSORLOCATION.KV2; // Mặc định
    }
  }

  async loadEnvironmentData(day: string) {
    try {
      if (this.useMockData) {
        // Sử dụng dữ liệu mẫu
        const response = await this.http
          .get('./assets/mock-data/statistics.json')
          .toPromise();

        // Lấy dữ liệu cho khu vực đã chọn
        const areaData = this.getAreaDataFromMock(response, day);

        if (areaData && areaData.length > 0) {
          this.environmentData = areaData;
        } else {
          this.environmentData = [];
          this.showNoDataMessage();
          return; // Thoát sớm nếu không có dữ liệu
        }
      } else {
        // Sử dụng API thật với khu vực đã chọn
        let location;
        switch (this.sensorLocation) {
          case '1':
            location = DataTypeEnum.SENSORLOCATION.KV1;
            break;
          case '2':
            location = DataTypeEnum.SENSORLOCATION.KV2;
            break;
          case '3':
            location = DataTypeEnum.SENSORLOCATION.KV3;
            break;
          default:
            location = DataTypeEnum.SENSORLOCATION.KV2;
        }

        const data = await this.statisticsService.getSpecifiedDateData(
          location,
          day
        );

        if (data && data.length > 0) {
          this.environmentData = data;
        } else {
          this.environmentData = [];
          this.showNoDataMessage();
          return; // Thoát sớm nếu không có dữ liệu
        }
      }

      // Phát hiện và tạo cảnh báo
      this.generateAlerts();

      // Dự báo xu hướng
      this.generateForecastData();

      // Phân tích rủi ro
      this.analyzeRisks();

      // Cập nhật biểu đồ
      this.updateForecastView();
    } catch (error) {
      console.error('Error fetching data:', error);
      this.environmentData = [];
      this.showNoDataMessage();
    }
  }

  // Hàm mới để lấy dữ liệu cho khu vực cụ thể từ mock data
  getAreaDataFromMock(response: any, day: string) {
    console.log('Raw response:', response);
    console.log('Requested day:', day);
    console.log('Available dates:', Object.keys(response));

    // Kiểm tra xem response có tồn tại và có dữ liệu cho ngày không
    if (!response || !response[day] || !response[day].data) {
      console.log('Không có dữ liệu cho ngày', day);
      return [];
    }

    // Chuyển đổi sensorLocation thành đúng định dạng
    let areaId: string = 'KV' + this.sensorLocation;
    console.log('Đang tìm dữ liệu cho khu vực:', areaId);

    // Lọc dữ liệu theo sensorId
    const areaData = response[day].data.filter((item: any) => {
      return item.sensorId === areaId;
    });

    console.log('Kết quả lọc:', areaData);
    return areaData;
  }

  // Hàm mới để hiển thị thông báo không có dữ liệu
  showNoDataMessage() {
    // Xóa các cảnh báo
    this.alerts = [
      {
        title: 'Thông báo',
        message: `Không có dữ liệu cho khu vực ${this.getSelectedAreaText()} vào ngày ${this.formatDate(
          this.currentDate
        )}`,
        severity: 'warning',
        icon: 'information-circle-outline',
        time: new Date().toLocaleString(),
      },
    ];

    // Xóa dữ liệu dự báo
    this.forecastData = [];
    this.forecastAnalysis = `Không có dữ liệu cho khu vực ${this.getSelectedAreaText()} để phân tích xu hướng.`;

    // Xóa dữ liệu rủi ro
    this.risks = [];

    // Cập nhật biểu đồ (sẽ hiển thị trống)
    this.updateForecastView();
  }
  getCurrentDate(): string {
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1;
    const day: number = today.getDate();

    const formattedMonth: string = month < 10 ? '0' + month : '' + month;
    const formattedDay: string = day < 10 ? '0' + day : '' + day;

    return year + '-' + formattedMonth + '-' + formattedDay;
  }

  dateChanged(event: CustomEvent) {
    const selectedDate: string = event.detail.value;
    this.loadEnvironmentData(selectedDate);
  }
  onSensorLocationChange(event: any) {
    this.sensorLocation = event.detail.value;
    this.loadEnvironmentData(this.currentDate);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minute}`;
  }

  // Hệ thống cảnh báo tự động
  generateAlerts() {
    this.alerts = [];

    if (!this.environmentData || this.environmentData.length === 0) return;

    // Lấy dữ liệu mới nhất
    const latestData = this.environmentData[this.environmentData.length - 1];

    // Kiểm tra nhiệt độ
    if (latestData.temperature > this.safeThresholds.temperature.max) {
      this.alerts.push({
        title: 'Cảnh báo nhiệt độ cao',
        message: `Nhiệt độ hiện tại (${latestData.temperature}°C) vượt quá ngưỡng an toàn (${this.safeThresholds.temperature.max}°C)`,
        severity: 'danger',
        icon: 'thermometer-outline',
        time: this.formatDate(latestData.createAt),
      });
    } else if (latestData.temperature < this.safeThresholds.temperature.min) {
      this.alerts.push({
        title: 'Cảnh báo nhiệt độ thấp',
        message: `Nhiệt độ hiện tại (${latestData.temperature}°C) dưới ngưỡng an toàn (${this.safeThresholds.temperature.min}°C)`,
        severity: 'warning',
        icon: 'thermometer-outline',
        time: this.formatDate(latestData.createAt),
      });
    }

    // Kiểm tra độ ẩm
    if (latestData.humidity > this.safeThresholds.humidity.max) {
      this.alerts.push({
        title: 'Cảnh báo độ ẩm cao',
        message: `Độ ẩm hiện tại (${latestData.humidity}%) vượt quá ngưỡng an toàn (${this.safeThresholds.humidity.max}%)`,
        severity: 'warning',
        icon: 'water-outline',
        time: this.formatDate(latestData.createAt),
      });
    } else if (latestData.humidity < this.safeThresholds.humidity.min) {
      this.alerts.push({
        title: 'Cảnh báo độ ẩm thấp',
        message: `Độ ẩm hiện tại (${latestData.humidity}%) dưới ngưỡng an toàn (${this.safeThresholds.humidity.min}%)`,
        severity: 'warning',
        icon: 'water-outline',
        time: this.formatDate(latestData.createAt),
      });
    }

    // Kiểm tra chất lượng không khí (Giả định brightness là chỉ số chất lượng không khí)
    const airQuality = this.convertBrightnessToAirQuality(
      latestData.brightness
    );
    if (airQuality > this.safeThresholds.airQuality.max) {
      this.alerts.push({
        title: 'Cảnh báo chất lượng không khí',
        message: `Chất lượng không khí hiện tại (${airQuality}) không đạt tiêu chuẩn an toàn`,
        severity: 'danger',
        icon: 'leaf-outline',
        time: this.formatDate(latestData.createAt),
      });
    }
  }

  // Hàm chuyển đổi brightness thành chỉ số chất lượng không khí (đơn giản hóa)
  convertBrightnessToAirQuality(brightness: number): number {
    // Giả định: brightness cao = ít bụi mịn = chất lượng không khí tốt hơn
    // Công thức đơn giản: AQI = 100 - (brightness/10)
    const aqi = Math.round(100 - brightness / 10);
    return Math.max(0, Math.min(100, aqi)); // Giới hạn trong khoảng 0-100
  }

  // Dự đoán xu hướng
  generateForecastData() {
    if (!this.environmentData || this.environmentData.length < 3) {
      this.forecastData = [];
      return;
    }

    // Sử dụng mô hình hồi quy tuyến tính đơn giản để dự báo
    const now = new Date();
    this.forecastData = [];

    // Dự báo cho 12 giờ tiếp theo, cách nhau 2 giờ
    for (let i = 2; i <= 12; i += 2) {
      const forecastTime = new Date(now.getTime() + i * 60 * 60 * 1000);

      // Dự báo nhiệt độ
      const tempForecast = this.linearRegressionForecast('temperature', i);

      // Dự báo độ ẩm
      const humidityForecast = this.linearRegressionForecast('humidity', i);

      // Dự báo chất lượng không khí
      const brightnessForcast = this.linearRegressionForecast('brightness', i);
      const airQualityForecast =
        this.convertBrightnessToAirQuality(brightnessForcast);

      this.forecastData.push({
        time: forecastTime,
        temperature: tempForecast,
        humidity: humidityForecast,
        airQuality: airQualityForecast,
      });
    }

    // Phân tích xu hướng
    this.analyzeForecastTrend();
  }

  // Dự báo xu hướng sử dụng hồi quy tuyến tính đơn giản
  linearRegressionForecast(dataType: string, hoursAhead: number): number {
    // Lấy 10 điểm dữ liệu gần đây nhất hoặc ít hơn nếu không đủ
    const recentData = this.environmentData.slice(-10);

    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumX2 = 0;
    const n = recentData.length;

    // Chuyển đổi thời gian thành giờ để tính toán
    for (let i = 0; i < n; i++) {
      const x = i; // x là chỉ số thời gian (0, 1, 2...)
      const y =
        dataType === 'temperature'
          ? recentData[i].temperature
          : dataType === 'humidity'
          ? recentData[i].humidity
          : recentData[i].brightness;

      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumX2 += x * x;
    }

    // Tính toán hệ số hồi quy
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Dự báo giá trị
    const predictedValue = intercept + slope * (n + hoursAhead / 2);

    return Math.round(predictedValue * 10) / 10; // Làm tròn đến 1 chữ số thập phân
  }

  // Phân tích xu hướng từ dữ liệu dự báo
  analyzeForecastTrend() {
    if (this.forecastData.length < 2) {
      this.forecastAnalysis = 'Không đủ dữ liệu để phân tích xu hướng.';
      return;
    }

    const firstPoint = this.forecastData[0];
    const lastPoint = this.forecastData[this.forecastData.length - 1];

    if (this.selectedForecastType === 'temperature') {
      const tempDiff = lastPoint.temperature - firstPoint.temperature;
      if (Math.abs(tempDiff) < 1) {
        this.forecastAnalysis =
          'Nhiệt độ dự kiến giữ ổn định trong 12 giờ tới.';
      } else if (tempDiff > 0) {
        this.forecastAnalysis = `Nhiệt độ có xu hướng tăng khoảng ${tempDiff.toFixed(
          1
        )}°C trong 12 giờ tới. Cần chuẩn bị các biện pháp làm mát nếu cần thiết.`;
      } else {
        this.forecastAnalysis = `Nhiệt độ có xu hướng giảm khoảng ${Math.abs(
          tempDiff
        ).toFixed(
          1
        )}°C trong 12 giờ tới. Theo dõi để đảm bảo nhiệt độ không giảm xuống dưới ngưỡng an toàn.`;
      }
    } else if (this.selectedForecastType === 'humidity') {
      const humidityDiff = lastPoint.humidity - firstPoint.humidity;
      if (Math.abs(humidityDiff) < 3) {
        this.forecastAnalysis = 'Độ ẩm dự kiến giữ ổn định trong 12 giờ tới.';
      } else if (humidityDiff > 0) {
        this.forecastAnalysis = `Độ ẩm có xu hướng tăng khoảng ${humidityDiff.toFixed(
          1
        )}% trong 12 giờ tới. Cần chuẩn bị các biện pháp khử ẩm nếu cần thiết.`;
      } else {
        this.forecastAnalysis = `Độ ẩm có xu hướng giảm khoảng ${Math.abs(
          humidityDiff
        ).toFixed(
          1
        )}% trong 12 giờ tới. Theo dõi để đảm bảo độ ẩm không giảm xuống dưới ngưỡng an toàn.`;
      }
    } else {
      // Chất lượng không khí
      const aqDiff = lastPoint.airQuality - firstPoint.airQuality;
      if (Math.abs(aqDiff) < 5) {
        this.forecastAnalysis =
          'Chất lượng không khí dự kiến giữ ổn định trong 12 giờ tới.';
      } else if (aqDiff > 0) {
        this.forecastAnalysis = `Chất lượng không khí có xu hướng giảm (chỉ số tăng ${aqDiff.toFixed(
          0
        )} điểm) trong 12 giờ tới. Cân nhắc tăng cường thông gió hoặc sử dụng máy lọc không khí.`;
      } else {
        this.forecastAnalysis = `Chất lượng không khí có xu hướng cải thiện (chỉ số giảm ${Math.abs(
          aqDiff
        ).toFixed(0)} điểm) trong 12 giờ tới.`;
      }
    }
  }

  // Phân tích rủi ro
  analyzeRisks() {
    this.risks = [];

    if (
      !this.environmentData ||
      this.environmentData.length === 0 ||
      !this.forecastData ||
      this.forecastData.length === 0
    )
      return;

    // Rủi ro nhiệt độ
    const maxForecastTemp = Math.max(
      ...this.forecastData.map((d) => d.temperature)
    );
    const minForecastTemp = Math.min(
      ...this.forecastData.map((d) => d.temperature)
    );

    if (maxForecastTemp > this.safeThresholds.temperature.max + 3) {
      this.risks.push({
        title: 'Rủi ro nhiệt độ quá cao',
        level: 'danger',
        levelText: 'Cao',
        icon: 'thermometer-outline',
        description: `Nhiệt độ có thể đạt ${maxForecastTemp}°C trong 12 giờ tới, vượt xa ngưỡng an toàn.`,
        preventiveMeasures: [
          'Kích hoạt hệ thống làm mát',
          'Giảm số lượng thiết bị hoạt động để giảm nhiệt',
          'Tăng cường thông gió',
        ],
      });
    } else if (maxForecastTemp > this.safeThresholds.temperature.max) {
      this.risks.push({
        title: 'Rủi ro nhiệt độ cao',
        level: 'warning',
        levelText: 'Trung bình',
        icon: 'thermometer-outline',
        description: `Nhiệt độ có thể đạt ${maxForecastTemp}°C trong 12 giờ tới, vượt ngưỡng an toàn.`,
        preventiveMeasures: [
          'Chuẩn bị hệ thống làm mát',
          'Giám sát nhiệt độ thường xuyên',
          'Tăng cường thông gió nếu cần',
        ],
      });
    }

    if (minForecastTemp < this.safeThresholds.temperature.min - 3) {
      this.risks.push({
        title: 'Rủi ro nhiệt độ quá thấp',
        level: 'danger',
        levelText: 'Cao',
        icon: 'snow-outline',
        description: `Nhiệt độ có thể giảm xuống ${minForecastTemp}°C trong 12 giờ tới, thấp hơn nhiều so với ngưỡng an toàn.`,
        preventiveMeasures: [
          'Kích hoạt hệ thống sưởi',
          'Kiểm tra độ kín của cửa và cửa sổ',
          'Cân nhắc tạm dừng hoạt động của một số hệ thống nhạy cảm với nhiệt độ thấp',
        ],
      });
    } else if (minForecastTemp < this.safeThresholds.temperature.min) {
      this.risks.push({
        title: 'Rủi ro nhiệt độ thấp',
        level: 'warning',
        levelText: 'Trung bình',
        icon: 'snow-outline',
        description: `Nhiệt độ có thể giảm xuống ${minForecastTemp}°C trong 12 giờ tới, thấp hơn ngưỡng an toàn.`,
        preventiveMeasures: [
          'Chuẩn bị hệ thống sưởi',
          'Giám sát nhiệt độ thường xuyên',
        ],
      });
    }

    // Rủi ro độ ẩm
    const maxForecastHumidity = Math.max(
      ...this.forecastData.map((d) => d.humidity)
    );
    const minForecastHumidity = Math.min(
      ...this.forecastData.map((d) => d.humidity)
    );

    if (maxForecastHumidity > this.safeThresholds.humidity.max + 10) {
      this.risks.push({
        title: 'Rủi ro độ ẩm quá cao',
        level: 'danger',
        levelText: 'Cao',
        icon: 'water-outline',
        description: `Độ ẩm có thể đạt ${maxForecastHumidity}% trong 12 giờ tới, có thể gây hại cho thiết bị và gây mốc.`,
        preventiveMeasures: [
          'Kích hoạt máy hút ẩm',
          'Kiểm tra hệ thống thoát nước xung quanh',
          'Tăng cường thông gió',
        ],
      });
    } else if (maxForecastHumidity > this.safeThresholds.humidity.max) {
      this.risks.push({
        title: 'Rủi ro độ ẩm cao',
        level: 'warning',
        levelText: 'Trung bình',
        icon: 'water-outline',
        description: `Độ ẩm có thể đạt ${maxForecastHumidity}% trong 12 giờ tới, cao hơn mức khuyến nghị.`,
        preventiveMeasures: ['Chuẩn bị máy hút ẩm', 'Tăng cường thông gió'],
      });
    }

    if (minForecastHumidity < this.safeThresholds.humidity.min - 10) {
      this.risks.push({
        title: 'Rủi ro độ ẩm quá thấp',
        level: 'danger',
        levelText: 'Cao',
        icon: 'water-outline',
        description: `Độ ẩm có thể giảm xuống ${minForecastHumidity}% trong 12 giờ tới, có thể gây khó chịu và tĩnh điện.`,
        preventiveMeasures: [
          'Sử dụng máy tạo ẩm',
          'Cân nhắc đặt các bát nước trong phòng',
          'Hạn chế sử dụng máy lạnh',
        ],
      });
    } else if (minForecastHumidity < this.safeThresholds.humidity.min) {
      this.risks.push({
        title: 'Rủi ro độ ẩm thấp',
        level: 'warning',
        levelText: 'Trung bình',
        icon: 'water-outline',
        description: `Độ ẩm có thể giảm xuống ${minForecastHumidity}% trong 12 giờ tới, thấp hơn mức khuyến nghị.`,
        preventiveMeasures: ['Chuẩn bị máy tạo ẩm', 'Hạn chế sử dụng máy lạnh'],
      });
    }

    // Rủi ro chất lượng không khí
    const maxForecastAQ = Math.max(
      ...this.forecastData.map((d) => d.airQuality)
    );

    if (maxForecastAQ > this.safeThresholds.airQuality.max + 20) {
      this.risks.push({
        title: 'Rủi ro chất lượng không khí kém',
        level: 'danger',
        levelText: 'Cao',
        icon: 'leaf-outline',
        description: `Chỉ số chất lượng không khí có thể đạt ${maxForecastAQ} trong 12 giờ tới, ở mức có hại.`,
        preventiveMeasures: [
          'Kích hoạt hệ thống lọc không khí',
          'Đóng cửa sổ nếu ô nhiễm đến từ bên ngoài',
          'Kích hoạt hệ thống lọc không khí',
          'Đóng cửa sổ nếu ô nhiễm đến từ bên ngoài',
          'Hạn chế hoạt động tạo bụi trong không gian',
        ],
      });
    } else if (maxForecastAQ > this.safeThresholds.airQuality.max) {
      this.risks.push({
        title: 'Rủi ro chất lượng không khí giảm',
        level: 'warning',
        levelText: 'Trung bình',
        icon: 'leaf-outline',
        description: `Chỉ số chất lượng không khí có thể đạt ${maxForecastAQ} trong 12 giờ tới, cao hơn mức khuyến nghị.`,
        preventiveMeasures: [
          'Chuẩn bị hệ thống lọc không khí',
          'Tăng cường thông gió',
        ],
      });
    }
  }

  // Hiển thị biện pháp phòng ngừa
  async viewPreventiveMeasures(risk: any) {
    const alert = await this.alertController.create({
      header: 'Biện pháp phòng ngừa',
      subHeader: risk.title,
      message: risk.preventiveMeasures
        .map((measure: string) => `- ${measure}`)
        .join('<br>'),
      buttons: ['Đóng'],
    });

    await alert.present();
  }

  // Khởi tạo biểu đồ dự báo
  initializeCharts() {
    this.updateForecastView();
  }

  // Cập nhật hiển thị biểu đồ dự báo
  updateForecastView() {
    if (this.forecastChartObj) {
      this.forecastChartObj.destroy();
    }

    if (
      !this.forecastData ||
      this.forecastData.length === 0 ||
      !this.forecastChart
    ) {
      return;
    }

    const ctx = this.forecastChart.nativeElement.getContext('2d');

    // Chuẩn bị dữ liệu cho biểu đồ dựa trên loại dự báo đã chọn
    const labels = this.forecastData.map((data) => {
      const date = new Date(data.time);
      return `${date.getHours()}:00`;
    });

    let dataPoints: number[] = [];
    let title = '';
    let color = '';

    if (this.selectedForecastType === 'temperature') {
      dataPoints = this.forecastData.map((data) => data.temperature);
      title = 'Dự báo nhiệt độ (°C)';
      color = 'rgba(255, 46, 99, 1)';
    } else if (this.selectedForecastType === 'humidity') {
      dataPoints = this.forecastData.map((data) => data.humidity);
      title = 'Dự báo độ ẩm (%)';
      color = 'rgba(46, 204, 113, 1)';
    } else {
      dataPoints = this.forecastData.map((data) => data.airQuality);
      title = 'Dự báo chất lượng không khí (AQI)';
      color = 'rgba(52, 152, 219, 1)';
    }

    // Thêm dữ liệu hiện tại vào đầu biểu đồ
    if (this.environmentData && this.environmentData.length > 0) {
      const latestData = this.environmentData[this.environmentData.length - 1];

      labels.unshift('Hiện tại');

      if (this.selectedForecastType === 'temperature') {
        dataPoints.unshift(latestData.temperature);
      } else if (this.selectedForecastType === 'humidity') {
        dataPoints.unshift(latestData.humidity);
      } else {
        dataPoints.unshift(
          this.convertBrightnessToAirQuality(latestData.brightness)
        );
      }
    }

    // Phân tích xu hướng từ dữ liệu dự báo
    this.analyzeForecastTrend();

    // Tạo biểu đồ mới
    this.forecastChartObj = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: title,
            data: dataPoints,
            backgroundColor: color.replace('1)', '0.2)'),
            borderColor: color,
            pointBackgroundColor: color,
            pointBorderColor: '#fff',
            tension: 0.2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
