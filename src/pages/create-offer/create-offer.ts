import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

/**
 * Generated class for the CreateOfferComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@IonicPage({
  name: 'create-offer'
})
@Component({
  selector: 'create-offer',
  templateUrl: 'create-offer.html'
})
export class CreateOfferComponent {

  text: string;

  constructor() {
    console.log('Hello CreateOfferComponent Component');
    this.text = 'Hello World';
  }

}
