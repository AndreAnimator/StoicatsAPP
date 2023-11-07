import { Component, OnInit } from '@angular/core';
import { TheCatApiServiceService } from '../services/the-cat-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  catInfo: any;

  constructor(private catApiService: TheCatApiServiceService) {}

  ngOnInit() {
   this.catApiService.get().subscribe(result => {this.catInfo = result; console.log(this.catInfo)});
  }

}
