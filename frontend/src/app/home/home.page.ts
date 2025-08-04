import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TheCatApiServiceService } from '../services/the-cat-api-service.service';
import { StoicismQuoteAPIServiceService } from '../services/stoicism-quote-apiservice.service';
import { PopupModalComponent } from '../components/popup-modal-module/popup-modal/popup-modal.component';
import * as $ from 'jquery';

@Component({
 selector: 'app-home',
 templateUrl: 'home.page.html',
 styleUrls: ['home.page.scss'],
 standalone: false,
})
export class HomePage implements OnInit, AfterViewInit {
 catInfo : any;
 stoicInfo: any;
 constructor(private catApiService: TheCatApiServiceService, private stoicismApiService: StoicismQuoteAPIServiceService, public ModalController:ModalController) {}

 ngOnInit() {
   this.catApiService.get().subscribe(result => this.catInfo = result,
     error => console.error('Error:', error));
   this.stoicismApiService.get().subscribe(result => this.stoicInfo = result,
     error => console.error('Error:', error));
 }

 ngAfterViewInit() {
   setTimeout(function() {
     $(".dialog a").first().addClass("active");
   }, 1000);

   $(".dialog a").on("mouseover", function() {
     $(".dialog a").removeClass("active");
     $(this).addClass("active");
   });
 }

 async popup(cat: any){
  const modal = this.ModalController.create({
      component:PopupModalComponent,
      componentProps: {
          catInfo: cat
      }
  });
  console.log(cat);
  await (await modal).present();
}
}
