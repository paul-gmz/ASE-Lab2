import { Component, OnInit } from '@angular/core';
import { State } from './state';
import { WeatherService } from './weather.service';
import { CurrentWeather } from './weather';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService]
})

export class WeatherComponent implements OnInit {
  city = '';
  state = '';
  location = ''; // location used for request and heading displayed to user
  currentWeather: CurrentWeather;
  hourlyWeather = [];
  errorMsg: string;
  showCurrentWeather = false;
  showHourlyWeather = false;

  constructor(private weatherService: WeatherService, public datepipe: DatePipe) {}
  ngOnInit(): void {}

  getWeather() {
    if (this.city.trim() === '' && this.state.trim() === '') {
      alert('Please enter a city or state');
      return;
    }

    if (this.city !== '') {
      this.location = this.city;

    } else {
      if (this.state.length === 2) { // translate abbreviations to full state name
        this.location = State.getState(this.state);
      } else {
        this.location = this.state;
      }
    }
    // clear inputs
    this.city = '';
    this.state = '';

    this.weatherService.getCurrentWeather(this.location).subscribe(
      cwd => {
        this.currentWeather = cwd;

        // add corresponding image based on description
        if (this.currentWeather.image === 'Clear') {
          this.currentWeather.image = 'sunny.png';
        } else if (this.currentWeather.image === 'Rain' || this.currentWeather.image === 'Drizzle') {
          this.currentWeather.image = 'rain.png';
        } else if (this.currentWeather.image === 'Thunderstorm') {
          this.currentWeather.image = 'storm.png';
        } else if (this.currentWeather.image === 'Snow') {
          this.currentWeather.image = 'snow.png';
        } else {
          this.currentWeather.image = 'cloudy.png';
        }
        this.showCurrentWeather = true;
        // get proper location from api
        this.location = this.currentWeather.location;
      },
      error => (this.errorMsg = error as any)
    );
    this.weatherService.getHourlyWeather(this.location).subscribe(
      data => {
        this.extractHourly(data);
        this.showHourlyWeather = true;
      },
      error => (this.errorMsg = error as any)
    );

    // clear previous results and hide display divs
    this.showHourlyWeather = false;
    this.showCurrentWeather = false;
    this.hourlyWeather = [];
    this.currentWeather = undefined;
  }

  extractHourly(data) {
    let date;
    // free api only gives forecast in three hour increments for next day, display first 5
    for (let i = 0; i < 5; i++) {
      this.hourlyWeather.push({ time: data[i].dt_txt,
        weather: data[i].weather[0].description,
        image: 'cloudy.png',
        temp: data[i].main.temp,
        feels_like: data[i].main.feels_like,
        humidity: data[i].main.humidity
      });

      // format date and time
      date = new Date(this.hourlyWeather[i].time);
      this.hourlyWeather[i].date = this.datepipe.transform(date, 'MM/dd/yyyy');
      this.hourlyWeather[i].time = this.datepipe.transform(date, 'h a');

      // add corresponding image name
      if (data[i].weather[0].main === 'Clear') {
        this.hourlyWeather[i].image = 'sunny.png';
      } else if (data[i].weather[0].main === 'Rain' || data[i].weather[0].main === 'Drizzle') {
        this.hourlyWeather[i].image = 'rain.png';
      } else if (data[i].weather[0].main === 'Thunderstorm') {
        this.hourlyWeather[i].image = 'storm.png';
      } else if (data[i].weather[0].main === 'Snow') {
        this.hourlyWeather[i].image = 'snow.png';
      }
    }
  }
}
