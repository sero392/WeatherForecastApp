import { Component, OnInit } from '@angular/core';
import { WeatherforecastService } from '../../core/services/weatherforecast.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private posts: any = {};
  public currentTimeForecastTemperature: number = 0;
  public currentTime : number = 0;
  constructor(private weatherForecastService: WeatherforecastService) {
    this.currentTime = new Date().getHours();
   }

  // Method to get weather forecast data
  getWatherForecast() {
    this.weatherForecastService.getWeatherForecast().subscribe((data: any) => {
      this.posts = data;
      console.log(this.posts);
      this.formattedWeatherForecast();
    });
  }

  formattedWeatherForecast() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentHours = currentDate.getHours()
    
    const currentDateInForecast = this.posts?.hourly?.time?.filter((time: any) => {
      const postDate = new Date(time).getDate();
      const postHours = new Date(time).getHours();
      return postDate === currentDay &&  postHours === currentHours;
    });


   const currentWeatherForecast =  this.posts?.hourly?.temperature_2m[this.posts?.hourly?.time.indexOf(currentDateInForecast[0])];

    this.currentTimeForecastTemperature = currentWeatherForecast;
  }

  ngOnInit(): void {
    this.getWatherForecast();
  }
}
