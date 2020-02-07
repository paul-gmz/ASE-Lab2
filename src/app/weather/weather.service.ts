import { Injectable } from "@angular/core";
import { WeatherData } from "./weatherData";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

@Injectable()
export class WeatherService {
  private apiUrl: string = "https://api.openweathermap.org/data/2.5/weather?q=";
  private apiKey: string = "ad549223cd4887aaf3b228e8a368abdc";
  private url: string = "";
  constructor(private http: HttpClient) {}

  getCurrentWeatherByCity(city: string): Observable<WeatherData> {
    this.url = `${this.apiUrl}${city}&units=imperial&appid=${this.apiKey}`;
    return this.http.get<WeatherData>(this.url).pipe(
      map(res => {
        return res["main"];
      }),
      tap(data => console.log("All Data" + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getCurrentWeatherByState(state: string): Observable<WeatherData> {
    this.url = `${this.apiUrl}${state}&units=imperial&appid=${this.apiKey}`;
    return this.http.get<WeatherData>(this.url).pipe(
      tap(data => console.log("All Data" + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err.error.message);
  }
}
