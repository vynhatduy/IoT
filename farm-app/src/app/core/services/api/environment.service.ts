import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  API_URL: string = environment.api_url;

  constructor() {}

  getData() {
    return axios
      .get(`${this.API_URL}/environments/real-time?sensorLocation=kv2`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}
