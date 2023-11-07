import { Component, OnInit } from '@angular/core';
import { TheCatApiServiceService } from '../services/the-cat-api-service.service';
import { StoicismQuoteAPIServiceService } from '../services/stoicism-quote-apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  catInfo : any;
  stoicInfo: any;
  constructor(private catApiService: TheCatApiServiceService, private stoicismApiService: StoicismQuoteAPIServiceService) {}

  ngOnInit() {
    this.catApiService.get().subscribe(result => this.catInfo = result,
      error => console.error('Error:', error));
    this.stoicismApiService.get().subscribe(result => this.stoicInfo = result,
      error => console.error('Error:', error));
  }

}
