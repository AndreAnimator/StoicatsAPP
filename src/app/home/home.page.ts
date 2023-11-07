import { Component, OnInit } from '@angular/core';
import { TheCatApiServiceService } from '../services/the-cat-api-service.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  info : any;

  constructor(private catApiService: TheCatApiServiceService) {}

  ngOnInit() {
    this.catApiService.get().subscribe(result => this.info = result,
      error => {
        console.error('Error:', error);
      });
  }

}
