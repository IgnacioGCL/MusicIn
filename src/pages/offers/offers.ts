import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { OfferDetailsComponent } from '../../components/offer-details/offer-details';
import { Offer } from '../../models/models';
import { OffersManagerProvider } from '../../providers/offers-manager/offers-manager';
import { CreateOfferComponent } from '../../components/create-offer/create-offer';


@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {


  offers: Offer[];

  constructor(private modalCtrl: ModalController, private navCtrl: NavController, private offersManager: OffersManagerProvider) {
    this.offersManager.getOffers().subscribe(offers => {
      console.log(offers);
      this.offers = offers;
    });
  }

  seeOfferDetails(offer: Offer): void {
    this.modalCtrl.create(OfferDetailsComponent, {
      offer
    }).present();
  }

  createOffer(): void {
    this.navCtrl.push(CreateOfferComponent);
  }

  trackById(index, item) {
    return item.id;
  }

}
