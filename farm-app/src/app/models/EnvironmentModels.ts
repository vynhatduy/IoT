export interface EnvironmentData {
  id?: string;
  temperature: number;
  humidity: number;
  brightness: number; // Sử dụng làm chỉ số chất lượng không khí
  createAt: string;
  sensorLocation: string;
}

export interface Alert {
  id?: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'danger';
  icon: string;
  time: string;
  acknowledged?: boolean;
}

export interface Risk {
  id?: string;
  title: string;
  level: 'low' | 'warning' | 'danger';
  levelText: string;
  icon: string;
  description: string;
  preventiveMeasures: string[];
}

export interface ForecastData {
  time: Date;
  temperature: number;
  humidity: number;
  airQuality: number;
}

export interface SafeThresholds {
  temperature: { min: number; max: number };
  humidity: { min: number; max: number };
  airQuality: { min: number; max: number };
}
