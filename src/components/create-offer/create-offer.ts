import { Component } from '@angular/core';
import { GoogleAuthProvider } from '@firebase/auth-types';

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
