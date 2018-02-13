import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavParams, IonicPage } from 'ionic-angular';



@IonicPage({
  name: 'event-details'
})
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
