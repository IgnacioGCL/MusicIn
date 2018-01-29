import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { OfferDetailsComponent } from '../../components/offer-details/offer-details';

/**
 * Generated class for the OffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {

  constructor(private modalCtrl: ModalController) {
  }

  seeOfferDetails(){
    this.modalCtrl.create(OfferDetailsComponent).present();
  }

}
