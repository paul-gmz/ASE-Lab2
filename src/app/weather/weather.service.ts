import { Injectable } from '@angular/core';
import { CurrentWeather, HourlyWeather } from './weather';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class WeatherService {
  private currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private hourlyUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
  private urlParams = ',US&units=imperial&appid='; // additional params
  private apiKey = 'ad549223cd4887aaf3b228e8a368abdc';
  constructor(private http: HttpClient) {}

  getCurrentWeather(location: string): Observable<CurrentWeather> {
    const url = `${this.currentUrl}${location}${this.urlParams}${this.apiKey}`;
    return this.http.get<CurrentWeather>(url).pipe(
      map(res => {
        const weather = res['main'];
        weather.image = res['weather'][0].main;
        weather.description = res['weather'][0].description;
        return weather;
      }),
      tap(data => console.log('All Data' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getHourlyWeather(location: string): Observable<HourlyWeather[]> {
    const url = `${this.hourlyUrl}${location}${this.urlParams}${this.apiKey}`;
    return this.http.get<HourlyWeather[]>(url).pipe(
      map(res => {
        return res['list'];
      }),
      tap(data => console.log('All Data' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err.error.message);
  }
}
