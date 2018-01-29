import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the EventDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'event-details',
  templateUrl: 'event-details.html'
})
export class EventDetailsComponent {


  constructor(private viewCtrl: ViewController) {}

  closeInfo(){
    this.viewCtrl.dismiss();
  }

}
