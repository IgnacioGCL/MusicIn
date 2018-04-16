import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Offer } from '../../models/models';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'offer-details',
  templateUrl: 'offer-details.html'
})
export class OfferDetailsComponent {

  offer: Offer;

  constructor(private viewCtrl: ViewController, navParams: NavParams) {
    this.offer = navParams.get('offer');
  }

  formatNumber(mobileNumber: number): string {
    let numberToString: string = JSON.stringify(mobileNumber);
    return `${numberToString.substring(0, 3)} ${numberToString.substring(3, 6)} ${numberToString.substring(6, 9)}`;
  }

  closeInfo() {
    this.viewCtrl.dismiss();
  }
}
