import { Component } from '@angular/core';
import { ActionSheetController, NavController, LoadingController, Loading } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { AngularFireDatabase } from 'angularfire2/database';
import { Event } from '../../models/models';
import { ToastProvider } from '../../providers/toast/toast';
import { EventsProvider } from '../../providers/events/events';
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

  constructor(
    private navCtrl: NavController,
    private actionSheet: ActionSheetController,
    private datepicker: DatePicker,
    private db: AngularFireDatabase,
    private toast: ToastProvider,
    private loadingCtrl: LoadingController,
    private eventsProvider: EventsProvider,
    private native: NativeProvider
  ) {
    this.dateString = '';
    this.event = {
      title: '',
      description: '',
      image: '',
      date: 0,
      location: ''
    };
    this.imageUploaded = false;
    this.loader = this.loadingCtrl.create({ content: 'Espere un momento' });
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
