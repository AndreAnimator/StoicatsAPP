import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheCatApiServiceService {

  url = "https://api.thecatapi.com/v1/images/";
  apikey = "live_xtLBI54vpEjqEWyQjhb4MyJraCB82q3YkcORrw9AHYkAaQ3rT1lwF52F9YYsGPcv";

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(`${this.url}search?api_key=${this.apikey}&has_breeds=1`);
  }
}
