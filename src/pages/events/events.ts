import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { EventDetailsComponent } from '../../components/event-details/event-details';
import { CreateEventComponent } from '../../components/create-event/create-event';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  constructor(private modalCtrl: ModalController, private navCtrl: NavController) { }

  seeEventDetails() {
    this.modalCtrl.create(EventDetailsComponent).present();
  }

  createEvent() {
    this.navCtrl.push(CreateEventComponent);
  }

}
