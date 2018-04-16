import { Component, NgZone } from '@angular/core';
import { NavParams, LoadingController, Loading } from 'ionic-angular';
import { Event } from '../../models/models';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { ToastProvider } from '../../providers/toast/toast';


@Component({
  selector: 'page-events-map',
  templateUrl: 'events-map.html',
})
export class EventsMapPage {

  events: Event[];
  map: any;
  loading: Loading;
  event: Event;

  constructor(navParams: NavParams, private geolocation: Geolocation, private loadingCtrl: LoadingController, private toast: ToastProvider, private ngZone: NgZone) {
    this.events = navParams.get('events');
  }

  ionViewDidLoad() {
    this.getPosition();
    this.loading = this.loadingCtrl.create({ content: 'Espere un momento.' });
    this.loading.present();
  }

  getPosition(): any {
    this.geolocation.getCurrentPosition()
      .then(response => {
        this.loadMap(response).then(() => {
          this.loading.dismiss();
        });
      })
      .catch(error => {
        this.toast.errorInMap();
        this.loading.dismiss();
      });
  }

  loadMap(geolocation: Geoposition): Promise<any> {
    return new Promise(resolve => {
      let mapEle: HTMLElement = document.getElementById('map');
      let center = { lat: geolocation.coords.latitude, lng: geolocation.coords.longitude };

      // create map
      this.map = new google.maps.Map(mapEle, {
        center: center,
        zoom: 9
      });
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.events.forEach(event => {
          let marker = {
            icon: new google.maps.Marker({
              position: event.locationCoords,
              map: this.map,
              title: event.title
            }),
            event
          }
          google.maps.event.addListener(marker.icon, 'click', () => {
            this.ngZone.run(() => {
              this.event = marker.event;
            })
          })
        });
        resolve();
      });
    });
  }

  formatDate(dateInTimestamp: number): string {
    const date = new Date(dateInTimestamp);
    if ((date.getMonth() + 1) < 10) {
      return date.getDate() + '/0' + (date.getMonth() + 1) + '/' + date.getFullYear();
    } else {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
  }

}
