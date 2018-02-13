import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { NavController, IonicPage } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';

@IonicPage({
  name: 'events'
})
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  events: Event[];

  constructor(private modalCtrl: ModalController, private navCtrl: NavController, private eventsProvider: EventsProvider) {
    this.eventsProvider.getEvents().subscribe(events => this.events = events);
  }

  seeEventDetails(event) {
    this.modalCtrl.create('event-details', {
      event: event
    }).present();
  }

  createEvent() {
    this.navCtrl.push('create-event');
  }

  trackById(index, item) {
    return item.id;
  }

}
