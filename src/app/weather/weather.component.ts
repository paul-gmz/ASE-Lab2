import { Component, OnInit } from '@angular/core';
import { State } from './state';
import { WeatherService } from './weather.service';
import { CurrentWeather } from './weather';

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
  hourlyWeather = [];
  errorMsg: string;
  showWeatherData = false;
  showHourlyData = false;

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
      cwd => {
        this.currentWeather = cwd;
        this.showWeatherData = true;
      },
      error => (this.errorMsg = error as any)
    );
    this.weatherService.getHourlyWeather(this.location).subscribe(
      data => {
        this.extractHourly(data);
        this.showHourlyData = true;
      },
      error => (this.errorMsg = error as any)
    );
  }

  extractHourly(data) {
    for (let i = 0; i < 5; i++) {
      this.hourlyWeather.push({ time: data[i].dt_txt,
        weather: data[i].weather[0].main,
        image: 'sunny.png',
        temp: data[i].main.temp,
        feels_like: data[i].main.feels_like,
        humidity: data[i].main.humidity
      });
      if (this.hourlyWeather[i].weather === 'Clouds') {
        this.hourlyWeather[i].image = 'cloudy.png';
      } else if (this.hourlyWeather[i].weather === 'Rain' || this.hourlyWeather[i].weather === 'Drizzle') {
        this.hourlyWeather[i].image = 'rain.png';
      } else if (this.hourlyWeather[i].weather === 'Thunderstorm') {
        this.hourlyWeather[i].image = 'storm.png';
      } else if (this.hourlyWeather[i].weather === 'Snow') {
        this.hourlyWeather[i].image = 'snow.png';
      }
    }
  }
}
