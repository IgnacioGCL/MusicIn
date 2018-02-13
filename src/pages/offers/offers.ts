import { Component } from '@angular/core';
import { ModalController, IonicPage } from 'ionic-angular';

/**
 * Generated class for the OffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'offers'
})
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {

  constructor(private modalCtrl: ModalController) {
  }

  seeOfferDetails(){
    this.modalCtrl.create('offer-details').present();
  }

}
