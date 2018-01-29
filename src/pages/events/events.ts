import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { EventDetailsComponent } from '../../components/event-details/event-details';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  constructor(private modalCtrl: ModalController) {}

  seeEventDetails(){
    this.modalCtrl.create(EventDetailsComponent).present();
  }

}
