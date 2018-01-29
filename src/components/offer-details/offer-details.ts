import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the OfferDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'offer-details',
  templateUrl: 'offer-details.html'
})
export class OfferDetailsComponent {

  constructor(private viewCtrl: ViewController) { }

  closeInfo() {
    this.viewCtrl.dismiss();
  }
}
