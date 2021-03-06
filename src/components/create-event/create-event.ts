import { Component } from '@angular/core';
import { ActionSheetController, NavController, LoadingController, Loading } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { AngularFireDatabase } from 'angularfire2/database';
import { Event } from '../../models/models';
import { ToastProvider } from '../../providers/toast/toast';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';
import { NativeProvider } from '../../providers/native/native';


@Component({
  selector: 'create-event',
  templateUrl: 'create-event.html'
})
export class CreateEventComponent {

  imageSrc: string;
  imageUploaded: boolean;
  event: Event;
  now: number;
  dateString: string;
  loader: Loading;
  autocomplete: any;

  constructor(
    private navCtrl: NavController,
    private actionSheet: ActionSheetController,
    private datepicker: DatePicker,
    private db: AngularFireDatabase,
    private toast: ToastProvider,
    private loadingCtrl: LoadingController,
    private eventsProvider: EventsManagerProvider,
    private native: NativeProvider
  ) {
    this.dateString = '';
    this.event = {
      title: '',
      description: '',
      image: '',
      date: 0,
      location: '',
      locationCoords: { lat: 0, lng: 0 }
    };
    this.imageUploaded = false;
    this.loader = this.loadingCtrl.create({ content: 'Espere un momento' });
  }

  ionViewDidEnter() {
    let input = (<HTMLInputElement>document.getElementsByClassName("text-input-ios")[1]);
    let autocomplete = new google.maps.places.Autocomplete(input, { types: [], componentRestrictions: { country: "es" } });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      let place = autocomplete.getPlace();
      let geometry = place.geometry;
      this.event.location = place.formatted_address;      
      if ((geometry) !== undefined) {
        this.event.locationCoords.lat = geometry.location.lat();
        this.event.locationCoords.lng = geometry.location.lng();
      };
    });
  }


  closePage() {
    this.navCtrl.pop();
  }

  selectImage() {
    this.native.getImage().then(imageData => {
      this.event.image = imageData;
      this.imageSrc = imageData;
      this.imageUploaded = true;
    })
      .catch(err => console.log(err));
  }

  chooseDate() {
    this.datepicker.show({
      date: new Date(),
      mode: 'date',
      allowOldDates: false
    }).then(
      date => {
        this.event.date = date.getTime();
        this.dateString = this.getDateWithFormat(date);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  createEvent() {
    this.loader.present();
    this.eventsProvider.createEvent(this.event)
      .then(() => {
        this.loader.dismiss();
        this.navCtrl.pop();
        this.toast.eventCreated();
      })
      .catch(err => console.log(err));
  }

  private getDateWithFormat(date: Date): string {
    if ((date.getMonth() + 1) < 10) {
      return date.getDate() + '/0' + (date.getMonth() + 1) + '/' + date.getFullYear();
    } else {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
  }

}
