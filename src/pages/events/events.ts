import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { EventDetailsComponent } from '../../components/event-details/event-details';
import { CreateEventComponent } from '../../components/create-event/create-event';
import { NavController } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';

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
    this.modalCtrl.create(EventDetailsComponent, {
      event: event
    }).present();
  }

  createEvent() {
    this.navCtrl.push(CreateEventComponent);
  }

  trackById(index, item) {
    return item.id;
  }

}
