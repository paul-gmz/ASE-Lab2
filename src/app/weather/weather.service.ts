import { Injectable } from '@angular/core';
import { CurrentWeather, HourlyWeather } from './weather';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class WeatherService {
  private currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private hourlyUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
  private urlParams = ',US&units=imperial&appid=';
  private apiKey = 'ad549223cd4887aaf3b228e8a368abdc';
  private url = '';
  constructor(private http: HttpClient) {}

  getCurrentWeather(location: string): Observable<CurrentWeather> {
    this.url = `${this.currentUrl}${location}${this.urlParams}${this.apiKey}`;
    return this.http.get<CurrentWeather>(this.url).pipe(
      map(res => {
        return res['main'];
      }),
      tap(data => console.log('All Data' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getHourlyWeather(location: string): Observable<HourlyWeather> {
    this.url = `${this.hourlyUrl}${location}${this.urlParams}${this.apiKey}`;
    return this.http.get<HourlyWeather>(this.url).pipe(
      map(res => {
        return res['main'];
      }),
      tap(data => console.log('All Data' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err.error.message);
  }
}
