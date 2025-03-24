import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import axios from 'axios';
import { MockDataService } from '../mock-data.service';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  API_URL: string = environment.api_url;
  useMockData: boolean = true;

  constructor(private mockDataService: MockDataService) {}

  getData(): Promise<any> {
    if (this.useMockData) {
      return from(this.mockDataService.getFarmsData())
        .toPromise()
        .then((data) => data)
        .catch((error) => {
          console.error('Error fetching mock data:', error);
          throw error;
        });
    } else {
      return axios
        .get(`${this.API_URL}/farms`)
        .then((response) => response.data)
        .catch((error) => {
          console.error(error);
          throw error;
        });
    }
  }
}
