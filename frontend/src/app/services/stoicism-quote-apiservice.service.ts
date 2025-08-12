import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoicismQuoteAPIServiceService {
  server_api = environment.SERVER;

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get(`${this.server_api}/api/stoicquote`);
  }
}
