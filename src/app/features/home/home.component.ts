import { Component, OnInit, signal } from '@angular/core';
import { WeatherforecastService } from '../../core/services/weatherforecast.service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { City } from '../../core/models/city.model';
import {
  eWeatherStatus,
  WeatherDescriptions,
} from '../../core/enums/eWeatherStatus';

@Component({
  selector: 'app-home',
  imports: [SelectModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private posts: any = {};
  currentTimeForecastTemperature = signal(0);
  currentWeatherStatus= signal(eWeatherStatus.Sunny);
  currentTime = signal(0);

  weatherDescription = {...WeatherDescriptions};

  cities: City[] | undefined;
  selectedCity: City = { name: '', code: '', longitude: 0, latitude: 0 };

  constructor(private weatherForecastService: WeatherforecastService) {
    this.currentTime.set(new Date().getHours());
  }

  changeSelect(event: any) {
    this.getWatherForecast();
  }

  // Method to get weather forecast data
  getWatherForecast() {
    const longitude = this.selectedCity.longitude || 0;
    const latitude = this.selectedCity.latitude || 0;

    this.weatherForecastService
      .getWeatherForecast(longitude, latitude)
      .subscribe((data: any) => {
        this.posts = data;
        console.log(this.posts);
        this.formattedWeatherForecast();
      });
  }

  fillCities() {
    this.cities = [
      { name: 'New York', code: 'NY', longitude: 0, latitude: 0 },
      { name: 'Rome', code: 'RM', longitude: 0, latitude: 0 },
      { name: 'London', code: 'LDN', longitude: 0, latitude: 0 },
      { name: 'Istanbul', code: 'IST', longitude: 0, latitude: 0 },
      { name: 'Paris', code: 'PRS', longitude: 0, latitude: 0 },
      { name: 'Bursa', code: 'BRS', longitude: 29.074202, latitude: 40.193298 },
    ];
  }

  formattedWeatherForecast() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentHours = currentDate.getHours();

    const currentDateInForecast = this.posts?.hourly?.time?.filter(
      (time: any) => {
        const postDate = new Date(time).getDate();
        const postHours = new Date(time).getHours();
        return postDate === currentDay && postHours === currentHours;
      }
    );
    const hourIndex = this.posts?.hourly?.time.indexOf(
      currentDateInForecast[0]
    );
    this.currentTimeForecastTemperature.set(this.posts?.hourly?.temperature_2m[hourIndex]);
    this.currentWeatherStatus.set(this.posts?.hourly?.weather_code[hourIndex]);
  }

  ngOnInit(): void {
    this.fillCities();
  }
}
