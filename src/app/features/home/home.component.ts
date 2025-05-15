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
import { MainServiceService } from '../../core/services/main-service.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-home',
  imports: [SelectModule, FormsModule, CommonModule, ProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public posts: any = null;
  currentTimeForecastTemperature = signal(0);
  currentWeatherStatus = signal(eWeatherStatus.Sunny);
  currentTime = signal(0);

  weatherDescription = { ...WeatherDescriptions };

  cities: City[] | undefined;
  selectedCity: City = { name: '', code: '', longitude: 0, latitude: 0 };

  constructor(
    private weatherForecastService: WeatherforecastService,
    public mainService: MainServiceService
  ) {
    this.currentTime.set(new Date().getHours());
  }

  changeSelect(event: any) {
    this.getWatherForecast();
  }

  // Method to get weather forecast data
  getWatherForecast() {
    this.posts = null;
    const longitude = this.selectedCity.longitude || 0;
    const latitude = this.selectedCity.latitude || 0;
    this.mainService.showLoading();
    this.weatherForecastService
      .getWeatherForecast(longitude, latitude)
      .subscribe((data: any) => {

        this.mainService.hideLoading();
        this.posts = data;
        this.formattedWeatherForecast();
      });
  }

  fillCities() {
    this.cities = [
      { name: 'New York', code: 'NY', longitude: -73.935242, latitude: 40.730610 },
      { name: 'Rome', code: 'RM', longitude: 12.496366, latitude: 41.902782 },
      { name: 'London', code: 'LDN', longitude: -0.118092, latitude: 51.509865 },
      { name: 'Istanbul', code: 'IST', longitude: 28.979530, latitude: 41.015137 },
      { name: 'Paris', code: 'PRS', longitude: 2.349014, latitude: 48.864716 },
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
    this.currentTimeForecastTemperature.set(
      this.posts?.hourly?.temperature_2m[hourIndex]
    );
    this.currentWeatherStatus.set(this.posts?.hourly?.weather_code[hourIndex]);
  }

  ngOnInit(): void {
    this.fillCities();
  }
}
