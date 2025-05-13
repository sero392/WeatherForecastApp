import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherforecastService {
  private params = {
    "latitude": 38.9637,
    "longitude": 35.2433,
    "hourly": "temperature_2m"
  };
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http:HttpClient) { }

  getWeatherForecast() : Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { params: this.params });
  }

}
