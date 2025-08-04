import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss'],
})
export class PopupModalComponent  implements OnInit {
  catInfo: any;

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.catInfo = this.navParams.get('catInfo');
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}