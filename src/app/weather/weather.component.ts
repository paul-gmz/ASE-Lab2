import { Component, OnInit } from '@angular/core';
import { State } from './state';
import { WeatherService } from './weather.service';
import { CurrentWeather, HourlyWeather } from './weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService]
})

export class WeatherComponent implements OnInit {
  city = '';
  state = '';
  location = '';
  currentWeather: CurrentWeather;
  hourlyWeather: HourlyWeather;
  errorMsg: string;
  showWeatherData = false;

  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {}

  getWeather() {
    if (this.city.trim() === '' && this.state.trim() === '') {
      alert('Please enter a city or state');
      return;
    }

    if (this.city !== '') {
      this.location = this.city;
      this.city = '';

    } else {
      if (this.state.length === 2) {
        this.location = State.getState(this.state);
      } else {
        this.location = this.state;
      }
      this.state = '';
    }

    console.log(this.location);
    this.weatherService.getCurrentWeather(this.location).subscribe(
      cwd => (this.currentWeather = cwd),
      error => (this.errorMsg = error as any)
    );
    this.weatherService.getHourlyWeather(this.location).subscribe(
      cwd => (this.hourlyWeather = cwd),
      error => (this.errorMsg = error as any)
    );
    this.showWeatherData = true;
  }
}
