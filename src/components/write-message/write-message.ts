import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the WriteMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'write-message',
  templateUrl: 'write-message.html'
})
export class WriteMessageComponent {

  text: string;

  constructor(private viewCtrl: ViewController) {
  
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
