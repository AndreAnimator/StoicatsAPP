import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TheCatApiServiceService {
  server_key = environment.SERVER;

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(`${this.server_key}/api/catimage`);
  }
}
