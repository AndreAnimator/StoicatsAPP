import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TheCatApiServiceService {

  url = "https://api.thecatapi.com/v1/images/";
  api_key = environment.API_KEY;

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(`${this.url}search?api_key=${this.api_key}&has_breeds=1`);
  }
}
