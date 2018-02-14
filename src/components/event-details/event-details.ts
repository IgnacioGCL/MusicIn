import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavParams } from 'ionic-angular';

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

  event: Event;

  constructor(private viewCtrl: ViewController, private params: NavParams) {
    this.event = this.params.get('event');
  }

  closeInfo(){
    this.viewCtrl.dismiss();
  }

}
