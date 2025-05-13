import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherforecastService {
  private params = {
    "latitude": 0,
    "longitude": 0,
    "hourly": "temperature_2m"
  };
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http:HttpClient) { }

  getWeatherForecast(longitude:number,latitude:number) : Observable<any[]> {
    this.params.longitude = longitude;
    this.params.latitude = latitude;
    return this.http.get<any[]>(`${this.apiUrl}?latitude=${latitude}&longitude=${longitude}&hourly=weather_code,cloud_cover,temperature_2m`);
  }

}
