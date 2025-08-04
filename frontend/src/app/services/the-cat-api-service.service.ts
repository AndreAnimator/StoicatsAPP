import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TheCatApiServiceService {

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(`http://localhost:3000/api/catimage`);
  }
}
