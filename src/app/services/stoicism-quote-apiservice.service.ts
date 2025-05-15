import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoicismQuoteAPIServiceService {


  constructor(private http: HttpClient) { }

  get(){
    return this.http.get("https://stoic.tekloon.net/stoic-quote");
  }
}
